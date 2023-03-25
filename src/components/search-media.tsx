"use client"

import React, { useState } from "react"
import { useAtom } from "jotai"
import { Film, Trash } from "lucide-react"
import useSWR from "swr"

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading
} from "@/components/ui/command"
import useDebounce from "@/hooks/use-debounce"
import { mediaAtom } from "@/lib/store"
import type { Media } from "@/lib/types"
import { cn, fetcher } from "@/lib/utils"
import { env } from "@/env.mjs"

interface SearchResult {
  results: Media[]
}

const SearchMedia = () => {
  const [search, setSearch] = useState<string>("")
  const debounceSearch = useDebounce(search, 500)
  const [media, setMedia] = useAtom(mediaAtom)

  const { data, isLoading } = useSWR<SearchResult, boolean>(
    `https://api.themoviedb.org/3/search/multi?api_key=${env.NEXT_PUBLIC_TMBD_API_KEY}&query=${debounceSearch}&page=1&include_adult=false&language=es`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false
    }
  )

  const selectMedia = (item: Media) => {
    const found = media.some((m) => {
      return m.id == item.id
    })

    if (found) {
      return
    }

    if (media.length <= 2) {
      setMedia((media) => [...media, item])
      console.dir(item)
    }
    setSearch("")
  }

  return (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder="Buscar..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        {isLoading && (
          <CommandLoading>
            <span className="block pb-4 text-gray-300">Buscando...</span>
          </CommandLoading>
        )}
        {data?.results &&
          data.results.map((item) => {
            const mediaTitle =
              item.media_type == "movie" ? item.title : item.name
            const year = new Date(item.release_date).getFullYear()

            return (
              <CommandItem
                key={item.id}
                value={item.id.toString()}
                onSelect={() => selectMedia(item)}
                className="gap-2"
              >
                {item.poster_path ? (
                  <Poster path={item.poster_path} size="sm" />
                ) : (
                  <EmptyPoster size="sm" />
                )}
                <span className="text-gray-50">{mediaTitle}</span>
                {!isNaN(year) && (
                  <span className="text-gray-50">{`(${year})`}</span>
                )}
              </CommandItem>
            )
          })}
        <SelectedMovies />
      </CommandList>
    </Command>
  )
}

const Poster = ({ path, size }: { path: string; size: "sm" | "md" | "lg" }) => {
  let mediaSize = ""
  let twSize = ""

  switch (size) {
    case "sm":
      mediaSize = "w92"
      twSize = "w-10"
      break
    case "md":
      mediaSize = "w154"
      twSize = "w-20"
      break
    case "lg":
      mediaSize = "w185"
      twSize = "w-28"
      break
    default:
      mediaSize = "w92"
      twSize = "w-10"
      break
  }

  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/${mediaSize}/${path}`}
        className={cn("w-10 rounded border border-white/10 shadow-md", twSize)}
      />
    </div>
  )
}

const EmptyPoster = ({ size }: { size: "sm" | "md" | "lg" }) => {
  let twSize = ""

  switch (size) {
    case "sm":
      twSize = "w-10  h-[59px]"
      break
    case "md":
      twSize = "w-20 h-[119px]"
      break
    case "lg":
      twSize = "w-28 h-[167px]"
      break
    default:
      twSize = "w-10"
      break
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded border border-white/10 bg-gray-700 shadow-md",
        twSize
      )}
    >
      <Film className="h-6 w-6 shrink-0 text-gray-500" strokeOpacity={1} />
    </div>
  )
}

const SelectedMovies = () => {
  const [media, setMedia] = useAtom(mediaAtom)

  const handleDeleteMedia = (item: Media) => {
    setMedia(
      media.filter((m) => {
        return m.id !== item.id
      })
    )
  }

  return (
    <div className="flex justify-around gap-4 p-2 sm:gap-8 sm:p-4">
      {media && media.length > 0 ? (
        media.map((item) => {
          const mediaTitle = item.media_type == "movie" ? item.title : item.name
          return (
            <div
              key={item.id}
              className="group flex max-w-[80px] flex-col items-center gap-2 sm:max-w-[120px]"
            >
              <div className="relative">
                <div className="w-18 absolute -top-1 -right-1 flex w-20 justify-end opacity-0 transition group-hover:opacity-100">
                  <button
                    type="button"
                    className="rounded-full bg-red-800 p-1 shadow active:scale-90"
                    onClick={() => handleDeleteMedia(item)}
                  >
                    <Trash className="h-4 w-4 text-red-400" />
                  </button>
                </div>
                {item.poster_path ? (
                  <Poster path={item.poster_path} size="lg" />
                ) : (
                  <EmptyPoster size="lg" />
                )}
              </div>
              <div className="flex items-center justify-center">
                <span className="text-xs">{mediaTitle}</span>
              </div>
            </div>
          )
        })
      ) : (
        <span>Selecciona una película o serie</span>
      )}
    </div>
  )
}

export default SearchMedia
