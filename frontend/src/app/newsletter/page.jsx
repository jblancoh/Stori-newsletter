import NewsletterForm from "./components/Forms";


export default function Page() {
  return (
    <div className="card shadow-xl py-8">
      <div className="card-body">
        <h2 className="card-title">Newsletter</h2>
        <p>
          Crear newsletter
        </p>
        <NewsletterForm />
      </div>
    </div>
  )
}