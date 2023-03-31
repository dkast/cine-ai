import Balancer from "react-wrap-balancer"
import { Clapperboard } from "lucide-react"
import Link from "next/link"

import GenerateResults from "@/components/generate-results"
import SearchMedia from "@/components/search-media"
import SelectKind from "@/components/select-kind"
import GitHubLogo from "@/components/github-logo"

export default function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col">
      <header className="py-8 flex justify-between px-3 sm:px-1">
        <div className="flex items-center gap-2">
          <Clapperboard className="h-8 w-8 text-amber-400" />
          <span className="text-2xl text-white">CineAI</span>
        </div>
        <Link href="https://github.com/dkast/watch-gpt" className="border hover:bg-gray-800 border-gray-400 rounded-full flex py-2 px-3 gap-2">
          <GitHubLogo />
          <span>Ver en GitHub</span>
        </Link>
      </header>
      <main className="flex flex-col gap-10 py-16 px-3 text-center sm:py-24 sm:px-1">
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
      <footer className="text-center py-8 text-sm">
        <Balancer>Desarrollado por <Link href="https://dkast.dev" className="text-gray-200 hover:underline">Daniel Castillejo</Link>, habilitado por <Link href="https://openai.com/blog/chatgpt" className="text-gray-200 hover:underline">ChatGPT</Link>.
        </Balancer>
      </footer>
    </div>
  )
}
