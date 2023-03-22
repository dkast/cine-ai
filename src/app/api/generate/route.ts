import { OpenAIStream, type OpenAIStreamPayload } from "@/lib/open-ai-stream";


export const config = {
  runtime: "edge"
}

export async function POST(request: Request) {
  const { prompt } = (await request.json()) as {
    prompt?: string
  }

  if(!prompt) {
    return new Response("No prompt in request", {status: 400})
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 600,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
