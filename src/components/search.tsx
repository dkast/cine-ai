"use client"

import React, { useState } from "react"
import { useAtom } from "jotai"
import { Film } from "lucide-react"
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
import { fetcher } from "@/lib/utils"
import { env } from "@/env.mjs"

interface SearchResult {
  results: Media[]
}

const Search = () => {
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
    if (media.length <= 2) {
      setMedia((media) => [...media, item])
      console.dir(item)
    }
  }

  return (
    <div>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Buscar..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          {isLoading && (
            <CommandLoading>
              <span className="p-2 text-neutral-300">Buscando...</span>
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
                    <Poster path={item.poster_path} />
                  ) : (
                    <EmptyPoster />
                  )}
                  <span className="text-neutral-50">{mediaTitle}</span>
                  {!isNaN(year) && (
                    <span className="text-neutral-50">{`(${year})`}</span>
                  )}
                </CommandItem>
              )
            })}
        </CommandList>
      </Command>
    </div>
  )
}

const Poster = ({ path }: { path: string }) => {
  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/w92/${path}`}
        className="w-10 rounded border border-white/10"
      />
    </div>
  )
}

const EmptyPoster = () => {
  return (
    <div className="flex h-[59px] w-10 items-center justify-center rounded border border-white/10 bg-neutral-700">
      <Film className="h-6 w-6 shrink-0 text-neutral-500" strokeOpacity={1} />
    </div>
  )
}

export default Search
