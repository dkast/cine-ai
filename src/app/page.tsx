import Balancer from "react-wrap-balancer"

export default function Home() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col">
      <div className="flex flex-col gap-8 py-32 text-center sm:py-44">
        <h1 className="text-5xl font-bold text-zinc-50">
          <Balancer>
            Descubre tu próxima película o serie favorita con la ayuda de IA.
          </Balancer>
        </h1>
        <p className="text-xl text-zinc-500">
          Personaliza tus recomendaciones de cine y TV: elige 3 de tus películas
          o series favoritas y nosotros nos encargamos del resto.
        </p>
      </div>
    </main>
  )
}
