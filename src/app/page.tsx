import Balancer from "react-wrap-balancer"

import GenerateResults from "@/components/generate-results"
import SearchMedia from "@/components/search-media"
import SelectKind from "@/components/select-kind"

export default function Home() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col">
      <div className="flex flex-col gap-8 py-32 text-center sm:py-44">
        <h1 className="text-5xl font-bold text-neutral-50">
          <Balancer>
            Descubre tu próxima serie favorita o película con la ayuda de IA.
          </Balancer>
        </h1>
        <p className="text-xl">
          Personaliza tus recomendaciones de cine y TV: elige 3 de tus películas
          o series favoritas y nosotros nos encargamos del resto.
        </p>
        <SearchMedia />
        <SelectKind />
        <GenerateResults />
      </div>
    </main>
  )
}
