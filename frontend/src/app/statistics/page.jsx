import BoxStatistics from "./components/BoxStatistics";

export default async function Page() {
  return (
    <div className="card shadow-xl py-8">
      <div className="card-body">
        <h2 className="card-title">Estadística</h2>
         <BoxStatistics />
      </div>
    </div>
  )
}
