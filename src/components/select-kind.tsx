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
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
      <span className="text-base sm:text-lg">
        ¿Que tipo de recomendaciones estas buscando?
      </span>
      <Select
        value={kind}
        onValueChange={(value: Kind) => setKind(value as Kind)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="movie">Película</SelectItem>
          <SelectItem value="tv">Serie de TV</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectKind
