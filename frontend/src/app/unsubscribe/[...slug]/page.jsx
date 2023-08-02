'use client'
import { useEffect, useState } from "react"

const getUnsubscribe = async (slug) => {
  const email = slug[0]
  const categoryId = slug[1]
  const res = await fetch(`/api/unsubscribe/?email=${email}&categoryId=${categoryId}`, {
    method: 'GET',
  })
  const data = await res.json()
  return data
}

export default function Page({params}) {
  const [data, setData] = useState({})
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const unsubscribe = async () => {
      const data = await getUnsubscribe(params.slug)
      if(data?.error) return setError(data.error)
      setData(data)
    }
    unsubscribe()
  }, [])
  
  return (
    <div className="card shadow-xl py-8">
     
      <div className="card-body">
       {
          data?.message
          ? <h2 className="card-title">{data?.message}</h2>
          : error ? <h2 className="card-title">{error}</h2> :
          <h2 className="card-title">Unsubscribe in process</h2>
       }        
      </div>
    </div>
  )
}
