import { NextResponse } from "next/server";

export async function POST(req) {
  const { emails, subscribed_newsletters } = await req.json()

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/add_subscriber/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({emails, subscribed_newsletters})
    })
    const data = await res.json()
    
    if(!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
  
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
