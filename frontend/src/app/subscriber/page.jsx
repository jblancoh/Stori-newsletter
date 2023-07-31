import SubscriberForm from "./components/Forms"

export default async function Page() {
  
  return (
    <div className="card shadow-xl py-8">
      <div className="card-body">
        <h2 className="card-title">Agregar subscritores</h2>
        <SubscriberForm />
      </div>
    </div>
  )
}
