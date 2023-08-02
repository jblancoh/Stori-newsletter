'use client'
import { addNewsletter } from "@/services/newsletter"
import { useState } from "react"

const NewsletterForm = () => {
  const [category, setCategory] = useState('')
  const [file, setFile] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(null)
  
  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)
    try {
      const response = await addNewsletter({category, file, date})
      setLoading(false)
      return setMessage(response.message)
    } catch (error) {
      setLoading(false)
      return setError(error?.message)
    }
  }
  
  const handleChange = (e) => {
    const type = e.target.type
    if (type === 'file') {
      return setFile(e.target.files[0])
    }
    if (type === 'datetime-local') {
      return setDate(e.target.value)
    }
    return setCategory(e.target.value)
  }

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
      <form onSubmit={onSubmit}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Agregar una imagen o pdf*</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Selecciona una categoria</span>
          </label>
          <select 
            className="select select-bordered"
            onChange={handleChange}
            >
            <option value={''}>Selecciona</option>
            <option value={1}>Lo nuevo</option>
            <option value={2}>Finanzas</option>
            <option value={3}>Deportes</option>
            <option value={4}>Peliculas</option>
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Fecha de publicación</span>
          </label>
          <input
            type="datetime-local"
            className="input input-bordered"
            onChange={handleChange}
          />
        </div>
        <div className="form-control w-full max-w-xs my-8">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
          >
            Crear
          </button>
        </div>
      </form>
    </>
  )
}

export default NewsletterForm