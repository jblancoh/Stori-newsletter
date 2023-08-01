
const getStatistics = async () => {
  const res = await fetch(`http://localhost:3000/api/statistics/`, { cache: 'no-store' })
  if (!res.ok) {
    return { message: 'Error al obtener las estadisticas', status: res.status }
  }
  const data = await res.json()
  return data
}

const BoxStatistics = async() => {
  
  const dataStatistics = await getStatistics()
  
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="col-span-1">
        <label className="label">
          {`Total de suscriptores: ${dataStatistics?.num_subscribers}`}
        </label>
      </div>
      <div className="col-span-1">
        <label className="label">
          {`Total de newsletters creados: ${dataStatistics?.num_sent_mails}`}
        </label>
      </div>
    </div>
  )
}

export default BoxStatistics