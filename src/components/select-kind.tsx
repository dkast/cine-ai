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

const SelectKind = () => {
  const [kind, setKind] = useAtom(kindAtom)
  console.log(kind)
  return (
    <div className="flex items-center gap-4">
      <span className="text-xl">
        ¿Que tipo de recomendaciones estas buscando?
      </span>
      <Select value={kind} onValueChange={(value) => setKind(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Series de TV">Serie de TV</SelectItem>
          <SelectItem value="Películas">Película</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectKind
