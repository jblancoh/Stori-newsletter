import { NextResponse } from "next/server";

export async function POST(req) {
  const { emails, subscribed_newsletters } = await req.json()
  try {
    const res = await fetch('http://127.0.0.1:8000/api/add_subscriber/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({emails, subscribed_newsletters})
    })
    const data = await res.json()
    
    if(!res.ok) {
      console.log("🚀 ~ file: route.js:12 ~ POST ~ res:", data)
      return NextResponse.json(data, { status: res.status })
    }
  
    return NextResponse.json(data)
  } catch (error) {
    console.log("🚀 ~ file: route.js:17 ~ POST ~ error", error)
    return NextResponse.json(error, { status: 400 })
  }
}
  