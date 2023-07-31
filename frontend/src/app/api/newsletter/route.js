import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch('http://127.0.0.1:8000/api/newsletter_list/', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await res.json()
  return NextResponse.json(json)
}

export async function POST(request) {
  const body = await request.json()
  console.log(body);
  const res = await fetch('http://127.0.0.1:8000/api/send_newsletter/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const json = await res.json()
  return NextResponse.json(json)
}