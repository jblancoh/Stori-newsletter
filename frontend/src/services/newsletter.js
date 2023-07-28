
export async function addNewsletter (data) {
  const formData = new FormData()
  formData.append('document', data.file)
  formData.append('category', data.category)
  const res = await fetch('http://127.0.0.1:8000/api/upload_newsletter/', {
    method: 'POST',
    body: formData
  })
  const json = await res.json()
  return json
}