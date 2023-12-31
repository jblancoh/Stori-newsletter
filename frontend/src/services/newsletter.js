import { setNewsletters } from "@/store"

export async function addNewsletter (data) {
  const formData = new FormData()
  formData.append('document', data.file)
  formData.append('category_id', data.category)
  formData.append('scheduled_time', data.date)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload_newsletter/`, {
    method: 'POST',
    body: formData
  })
  const jsonData = await res.json()
  return jsonData
}

export async function getNewsletterList() {
  console.log('>>>>>>><<<<<<', process.env.NEXT_PUBLIC_API_URL_CLIENT);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_CLIENT}/api/newsletter/`)
  if (!res.ok) {
    return { message: 'Error al obtener la lista de newsletters', status: res.status }
  }  
  const data = await res.json()
  const list = Object.values(data)
  setNewsletters(list)
  return list
}

export async function sendNewsletter(data) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_CLIENT}/api/newsletter/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const json = await res.json()
  if (!res.ok) {
    return { message: json?.error || 'Error al enviar el newsletter', status: res.status}
  }
  return json
}