import Balancer from "react-wrap-balancer"
import { Clapperboard } from "lucide-react"
import Link from "next/link"

import GenerateResults from "@/components/generate-results"
import GitHubLogo from "@/components/github-logo"
import SearchMedia from "@/components/search-media"
import SelectKind from "@/components/select-kind"

export default function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col">
      <header className="flex justify-between px-3 py-8 sm:px-1">
        <div className="flex items-center gap-2">
          <Clapperboard className="h-8 w-8 text-amber-400" />
          <span className="text-2xl text-white">CineAI</span>
        </div>
        <Link
          href="https://github.com/dkast/watch-gpt"
          className="flex gap-2 rounded-full border border-gray-400 px-3 py-2 hover:bg-gray-800"
        >
          <GitHubLogo />
          <span>Ver en GitHub</span>
        </Link>
      </header>
      <main className="flex flex-col gap-10 px-3 py-16 text-center sm:px-1 sm:py-24">
        <h1 className="text-3xl font-bold text-gray-50 sm:text-4xl">
          <Balancer>
            Descubre tu próxima serie favorita o película con la ayuda de IA.
          </Balancer>
        </h1>
        <p className="text-base sm:text-xl">
          Personaliza tus recomendaciones de cine y TV: elige hasta 3 de tus
          películas o series favoritas y nos encargamos del resto.
        </p>
        <SearchMedia />
        <SelectKind />
        <GenerateResults />
      </main>
      <footer className="py-8 text-center text-sm">
        <Balancer>
          Desarrollado por{" "}
          <Link
            href="https://dkast.dev"
            className="text-gray-200 hover:underline"
          >
            Daniel Castillejo
          </Link>
          , habilitado por{" "}
          <Link
            href="https://openai.com/blog/chatgpt"
            className="text-gray-200 hover:underline"
          >
            ChatGPT
          </Link>
          .
        </Balancer>
      </footer>
    </div>
  )
}
