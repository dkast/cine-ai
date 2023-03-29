import Balancer from "react-wrap-balancer"

import GenerateResults from "@/components/generate-results"
import SearchMedia from "@/components/search-media"
import SelectKind from "@/components/select-kind"

export default function Home() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col">
      <div className="flex flex-col gap-10 py-24 px-3 text-center sm:py-32 sm:px-1">
        <h1 className="text-3xl font-bold text-gray-50 sm:text-4xl">
          <Balancer>
            Descubre tu próxima serie favorita o película con la ayuda de IA.
          </Balancer>
        </h1>
        <p className="text-base sm:text-xl">
          Personaliza tus recomendaciones de cine y TV: elige hasta 3 de tus
          películas o series favoritas y nosotros nos encargamos del resto.
        </p>
        <SearchMedia />
        <SelectKind />
        <GenerateResults />
      </div>
    </main>
  )
}
