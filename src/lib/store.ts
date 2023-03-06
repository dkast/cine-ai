import { atom } from "jotai"
import type { Media } from "@/lib/types"

export const mediaAtom = atom<Media[]>([])