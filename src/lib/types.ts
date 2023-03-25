export type Media = {
  id: number
  poster_path?: string
  backdrop_path?: string
  media_type: Kind
  name?: string
  title?: string
  release_date: string
  popularity: number
  vote_average: number
}

export type Kind = "movie" | "tv"
