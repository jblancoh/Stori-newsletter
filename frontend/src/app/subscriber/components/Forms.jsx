'use client'
import { getNewsletterList } from "@/services/newsletter"
import useStore from "@/store"
import { useState, useEffect } from "react"

const addSubscriber = async (emails, newsletters) => {
  const res = await fetch('http://localhost:3000/api/subscriber/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ emails, subscribed_newsletters: newsletters})
  })
  const json = await res.json()
  if (!res.ok) {
    return { message: json?.error || 'Error al agregar los suscriptores', status: res.status}
  }
  return json
}

const SubscriberForm = () => {
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [emails, setEmails] = useState("")
  const [newslettersSelected, setNewslettersSelected] = useState([])
  const newsletters = useStore(state => state.newsletters)
  
  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)
    try {
      const response = await addSubscriber(emails, newslettersSelected)
      if (response.status) {
        setLoading(false)
        return setError(response.message)
      }
      setLoading(false)
      return setMessage(response.message)
    } catch (error) {
      setLoading(false)
      return setError(error?.message)
    }
  }
  
  const handleChange = (e) => {
    const options = e.target.options
    const value = []
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value)
      }
    }
    setNewslettersSelected(value)
  }
  
  useEffect(() => {
    const getList = async () => {
      await getNewsletterList()
    }
    getList()
  }, [])

  return (
    <>
      { error && 
        <div className="toast">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      }
      { message && 
        <div className="toast">
          <div className="alert alert-success">
            <span>{message}</span>
          </div>
        </div>
      }
      <form className="mx-auto" onSubmit={onSubmit}>
        <div className="form-control w-full max-w-xs my-8">
          <label className="label">
            <span className="label-text">Agregar una lista de suscriptores</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Agregar email(s) y separar por comas"
            onChange={(e) => setEmails(e.target.value)}
            required
          >
          </textarea>
        </div>
        <div className="form-control w-full max-w-xs">
          <select 
            className="select select-bordered"
            onChange={handleChange}
            multiple
            required
            >
            <option className="select-none" value="" disabled>Seleccione un newsletter</option>
            {newsletters?.length > 0 && newsletters?.map((item) => (
              <option key={item.id} value={item.id}>{item.category || 'Sin categoria'}</option>
            ))}
          </select>
        </div>
        <div className="form-control w-full max-w-xs my-8">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
          >
            Asignar
          </button>
        </div>
      </form>
    </>
  )
}

export default SubscriberForm