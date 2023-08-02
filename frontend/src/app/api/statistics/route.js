import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get_statistics/`, { cache: 'no-store' })
    const data = await res.json()
    if(!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
  
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
  