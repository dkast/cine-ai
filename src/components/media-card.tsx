"use client"

import React from "react"
import { Star } from "lucide-react"
import useSWR from "swr"

import { type Media } from "@/lib/types"
import { fetcher } from "@/lib/utils"
import { env } from "@/env.mjs"

interface SearchResult {
  results: Media[]
}
interface MediaCardProps {
  title: string
  description: string
  kind: string
}

const MediaCard = ({ title, description, kind }: MediaCardProps) => {
  const { data, isLoading } = useSWR<SearchResult, boolean>(
    `https://api.themoviedb.org/3/search/${kind}?api_key=${env.NEXT_PUBLIC_TMBD_API_KEY}&query=${title}&page=1&include_adult=false&language=es`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false
    }
  )

  return (
    <div className="relative overflow-clip rounded-lg border border-gray-800 bg-gray-800">
      {data && data.results[0]?.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/w780/${data.results[0]?.backdrop_path}`}
          alt={title}
          className="absolute inset-0 z-0 h-64 w-full object-cover"
        />
      )}
      <div className="absolute inset-0 z-10 w-full bg-gradient-to-b from-black/20 via-gray-900/90 to-gray-900"></div>
      <div className="relative z-20 p-5">
        <div className="flex items-end gap-4 pb-2 pt-20">
          <h2 className="text-left text-2xl font-bold text-gray-300">
            {title}
          </h2>
          {isLoading ? (
            <span>Cargando...</span>
          ) : (
            <span className="flex items-center gap-2 pb-1 text-amber-400">
              <Star className="inline-block h-4 w-4" />
              {data?.results[0]?.vote_average.toPrecision(2)}
            </span>
          )}
        </div>
        <p className="text-justify text-sm sm:text-base">{description}</p>
      </div>
    </div>
  )
}

export default MediaCard
