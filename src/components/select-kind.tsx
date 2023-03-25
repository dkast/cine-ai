"use client"

import React from "react"
import { useAtom } from "jotai"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { kindAtom } from "@/lib/store"
import { type Kind } from "@/lib/types"

const SelectKind = () => {
  const [kind, setKind] = useAtom(kindAtom)
  console.log(kind)
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <span className="text-base sm:text-xl">
        ¿Que tipo de recomendaciones estas buscando?
      </span>
      <Select value={kind} onValueChange={(value) => setKind(value as Kind)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tv">Serie de TV</SelectItem>
          <SelectItem value="movie">Película</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectKind
