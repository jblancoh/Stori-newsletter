import SubscriberForm from "./components/Forms"

export async function getNewsletterList() {
  const res = await fetch('http://127.0.0.1:3000/api/newsletter/', { cache: 'no-store'  })
  if (!res.ok) {
    return { message: 'Error al obtener la lista de newsletters', status: res.status}
  }
  const json = await res.json()
  return json
}

export default async function Page() {
  const list = await getNewsletterList()
  return (
    <div className="card shadow-xl py-8">
      <div className="card-body">
        <h2 className="card-title">Agregar subscritores</h2>
        <SubscriberForm list={list} />
      </div>
    </div>
  )
}
