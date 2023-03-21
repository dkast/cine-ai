"use client"

import React from "react"
import { useAtom } from "jotai"

import { kindAtom, mediaAtom } from "@/lib/store"
import { Media } from "@/lib/types"

const GenerateResults = () => {
  const [media] = useAtom(mediaAtom)
  const [kind] = useAtom(kindAtom)
  const enabled = media?.length > 0

  // const prompt = `Recomienda 5 ${kind} que sean similares al siguiente listado: ${
  //   (media.length) > 0 : media.map((item: Media) => {
  //     return item?.title
  //   }) : ""
  // }`
  console.log(prompt)

  return (
    <>
      <button
        disabled={!enabled}
        className="rounded-md bg-amber-500 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 active:scale-[0.99] disabled:opacity-70"
      >
        Genera recomendaciones
      </button>
    </>
  )
}

export default GenerateResults
