import NewsletterForm from "./components/Forms";


export default function Page() {
  return (
    <div className="card shadow-xl py-8">
      <div className="card-body">
        <h2 className="card-title">Crear newsletter</h2>
        <NewsletterForm />
      </div>
    </div>
  )
}