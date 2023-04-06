"use client"

import React, { useState } from "react"
import BeatLoader from "react-spinners/BeatLoader"
import { AnimatePresence, motion } from "framer-motion"
import { useAtom } from "jotai"
import { XOctagon } from "lucide-react"

import MediaCard from "@/components/media-card"
import { Textarea } from "@/components/ui/textarea"
import { kindAtom, mediaAtom } from "@/lib/store"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5
    }
  }
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

const GenerateResults = () => {
  const [media] = useAtom(mediaAtom)
  const [kind] = useAtom(kindAtom)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedKind, setSelectedKind] = useState("")
  const [generatedMedia, setGeneratedMedia] = useState<string>("")

  const prompt = `Recomienda 3 ${
    kind === "movie" ? "Películas" : "Series de TV"
  } que sean similares al siguiente listado: ${
    media.length > 0
      ? media
          .map((i) => {
            return i.title ? i.title : i.name
          })
          .join(",")
      : ""
  }. Regresa tu respuesta como una lista numerada con el titulo seguido por dos puntos, una breve descripción y la razón de la recomendación, deja una linea en blanco entre cada item de la lista.`

  const generateMedia = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault()
    setGeneratedMedia("")
    setSelectedKind(kind)
    setLoading(true)

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt
      })
    })

    if (!response.ok) {
      setLoading(false)
      setError(response.statusText)
      throw new Error(response.statusText)
    }

    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedMedia((prev) => prev + chunkValue)
    }

    setLoading(false)
  }

  return (
    <>
      <div>
        <label
          htmlFor="message"
          className="mb-3 block text-base sm:text-left sm:text-lg"
        >
          Puedes añadir algo más para que la recomendación sea más precisa
        </label>
        <Textarea
          placeholder="Ej. Estrenada en los 90's o disponible en Netflix"
          maxLength={140}
          id="message"
        />
      </div>
      <div className="flex justify-center">
        <motion.button
          type="button"
          animate={{ width: loading ? 90 : 300 }}
          disabled={media?.length === 0}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={(e) => generateMedia(e)}
          className="rounded-full bg-amber-400 px-3.5 py-2.5 text-sm font-semibold text-black/90 shadow-md shadow-amber-400/20 ring-2 ring-amber-300 transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 active:scale-[0.99] disabled:opacity-70"
        >
          <AnimatePresence>
            {loading ? (
              <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <BeatLoader color="#000" size={10} />
              </motion.div>
            ) : (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
                exit={{ opacity: 0, scale: 0 }}
              >
                Generar recomendaciones
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <motion.div variants={container} className="flex flex-col gap-4">
        {generatedMedia.split("\n").map((m, i) => {
          if (
            (generatedMedia.split("\n").length - 1 > i || !loading) &&
            m.trim() !== ""
          ) {
            // @ts-ignore
            const [, title, description] = m.match(/\d\.\s*(.*?):\s*(.*)/)
            return (
              <motion.div key={i} variants={item}>
                <MediaCard
                  title={title as string}
                  description={description as string}
                  kind={selectedKind}
                />
              </motion.div>
            )
          } else {
            return m
          }
        })}
        {error && (
          <motion.div
            variants={item}
            className="flex items-center rounded-lg border border-red-300/50 bg-red-900/50 p-2 text-red-400"
          >
            <div className="flex-shrink-0">
              <XOctagon size={16} />
            </div>
            <span className="ml-3">Ocurrió un error: {error}</span>
          </motion.div>
        )}
      </motion.div>
    </>
  )
}

export default GenerateResults
