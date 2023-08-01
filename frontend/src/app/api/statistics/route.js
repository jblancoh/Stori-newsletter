import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/get_statistics/')
    const data = await res.json()
    if(!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
  
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
  