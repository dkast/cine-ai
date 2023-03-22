import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { prompt } = (await request.json()) as {
    prompt?: string
  }

  return NextResponse.json({ prompt })
}
