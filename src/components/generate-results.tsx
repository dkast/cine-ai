"use client"

import React, { useState } from "react"
import BarLoader from "react-spinners/BarLoader"
import { useAtom } from "jotai"

import MediaCard from "@/components/media-card"
import { kindAtom, mediaAtom } from "@/lib/store"

const GenerateResults = () => {
  const [media] = useAtom(mediaAtom)
  const [kind] = useAtom(kindAtom)
  const [loading, setLoading] = useState<boolean>(false)
  const [generatedMedia, setGeneratedMedia] = useState<string>("")
  let done = false

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
  }. Regresa tu respuesta como una lista numerada con el titulo seguido por dos puntos, y una breve descripción, deja una linea en blanco entre cada item de la lista.`

  const generateMedia = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault()
    setGeneratedMedia("")
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
      throw new Error(response.statusText)
    }

    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()

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
      {loading ? (
        <BarLoader />
      ) : (
        <button
          disabled={media?.length === 0}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={(e) => generateMedia(e)}
          className="rounded-md bg-amber-500 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 active:scale-[0.99] disabled:opacity-70"
        >
          Genera recomendaciones
        </button>
      )}
      <div className="flex flex-col gap-4">
        {generatedMedia.split("\n").map((m, i) => {
          console.log(m)
          if (
            (generatedMedia.split("\n").length - 1 >= i || done) &&
            m.trim() !== ""
          ) {
            // @ts-ignore
            const [, title, description] = m.match(/\d\.\s*(.*?):\s*(.*)/)
            return (
              <MediaCard
                key={i}
                title={title as string}
                description={description as string}
                kind={kind}
              />
            )
          } else {
            return m
          }
        })}
      </div>
    </>
  )
}

export default GenerateResults
