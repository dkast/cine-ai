import { OpenAIStream, type OpenAIStreamPayload } from "@/lib/open-ai-stream"

export async function POST(request: Request) {
  const { prompt } = (await request.json()) as {
    prompt?: string
  }

  if (!prompt) {
    return new Response("No prompt in request", { status: 400 })
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 400,
    stream: true,
    n: 1
  }

  const stream = await OpenAIStream(payload)

  // DEBUG
  // const stream = `1. Minority Report: Dirigida por Steven Spielberg y basada en una historia de Philip K. Dick, Minority Report es un thriller de ciencia ficción que se desarrolla en un futuro en el que la policía utiliza la tecnología para predecir los crímenes antes de que ocurran. Con un reparto estelar encabezado por Tom Cruise, la película explora temas como el libre albedrío, la privacidad y la responsabilidad personal.

  // 2. Inception: Dirigida por Christopher Nolan, Inception es un thriller de ciencia ficción que sigue a un ladrón de sueños que entra en la mente de las personas para extraer información valiosa. Con un reparto de lujo encabezado por Leonardo DiCaprio, la película explora temas como la realidad, la percepción y la memoria.

  // 3. The Matrix: Dirigida por las hermanas Wachowski, The Matrix es un clásico de la ciencia ficción que sigue a un programador que descubre que la realidad en la que vive es una simulación creada por máquinas. Con un reparto encabezado por Keanu Reeves, la película explora temas como la identidad, la libertad y la rebelión.

  // 4. Arrival: Dirigida por Denis Villeneuve, Arrival es un drama de ciencia ficción que sigue a una lingüista que es contratada por el gobierno de los Estados Unidos para comunicarse con extraterrestres que han llegado a la Tierra. Con un reparto encabezado por Amy Adams, la película explora temas como la comunicación, la percepción del tiempo y la empatía.

  // 5. Ex Machina: Dirigida por Alex Garland, Ex Machina es un thriller de ciencia ficción que sigue a un programador que es contratado por un magnate de la tecnología para evaluar la inteligencia artificial de una androide femenina. Con un reparto encabezado por Domhnall Gleeson, Alicia Vikander y Oscar Isaac, la película explora temas como la conciencia, la moralidad y la creación.`
  return new Response(stream)
}
