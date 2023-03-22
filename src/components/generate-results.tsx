"use client"

import React, { useState } from "react"
import BarLoader from "react-spinners/BarLoader"
import { useAtom } from "jotai"

import { kindAtom, mediaAtom } from "@/lib/store"

const GenerateResults = () => {
  const [media] = useAtom(mediaAtom)
  const [kind] = useAtom(kindAtom)
  const enabled = media?.length > 0
  const [loading, setLoading] = useState<boolean>(false)
  const [generatedMedia, setGeneratedMedia] = useState<string>("")

  const prompt = `Recomienda 5 ${kind} que sean similares al siguiente listado: ${
    media.length > 0
      ? media
          .map((i) => {
            return i.title ? i.title : i.name
          })
          .join(",")
      : ""
  }. Regresa tu respuesta como una lista numerada con el titulo seguido por dos puntos, y una breve descripcion, deja una linea en blanco entre cada item de la lista.`

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
      {loading ? (
        <BarLoader />
      ) : (
        <button
          disabled={!enabled}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={(e) => generateMedia(e)}
          className="rounded-md bg-amber-500 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 active:scale-[0.99] disabled:opacity-70"
        >
          Genera recomendaciones
        </button>
      )}
      <div>{generatedMedia}</div>
    </>
  )
}

export default GenerateResults
