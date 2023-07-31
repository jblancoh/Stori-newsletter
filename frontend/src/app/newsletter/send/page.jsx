import FormSend from "./components/FormSend";

export default function Page() {
  return (
    <div className="card shadow-xl py-8">
      <div className="card-body">
        <h2 className="card-title">Enviar newsletter</h2>
        <FormSend />
      </div>
    </div>
  )
}