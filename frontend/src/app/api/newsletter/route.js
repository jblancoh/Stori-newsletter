import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter_list/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  })
  const json = await res.json()
  return NextResponse.json(json)
}

export async function POST(request) {
  const body = await request.json()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/send_newsletter/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const json = await res.json()
  return NextResponse.json(json)
}