import { NextResponse } from "next/server";

export async function POST(request) {
  
  try {
    const formData = await request.formData();
    const body = new FormData();
    const file = formData.get('document');
    const category = formData.get('category');
    body.append('document', file);
    body.append('category', category);
    const res = await fetch('http://127.0.0.1:8000/api/upload_newsletter/', {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${body._boundary}`,
      },
      body,
    })
    if (!res.ok) {
      return NextResponse.json({ error:'Error uploading file'}, { status: res.status })
    }
    return NextResponse.json({ message: "File uploaded successfully" });
  } catch (error) {
    return NextResponse.json({ error: 'Error uploading file'}, { status: 500 })
  }
}