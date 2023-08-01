import NewsletterForm from "./components/Forms";
import Tabs from "./components/Tabs";


export default function Page() {
  return (
    <div className="card shadow-xl py-8">
      <div className="card-body">
        <h2 className="card-title">Newsletter</h2>
        <Tabs />
      </div>
    </div>
  )
}