import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  const categoryId = searchParams.get('categoryId')
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/unsubscriber/${email}/${categoryId}/`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!res.ok) {
      return NextResponse.json({error: res.statusText}, { status: res.status })
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
