import { atom } from "jotai"

import type { Kind, Media } from "@/lib/types"

export const mediaAtom = atom<Media[]>([])

export const kindAtom = atom<Kind>("movie")
