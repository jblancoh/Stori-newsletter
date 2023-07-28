'use client'
import { addNewsletter } from "@/services/newsletter"
import { useState } from "react"

const NewsletterForm = () => {
  const [category, setCategory] = useState('')
  const [file, setFile] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  
  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    try {
      const response = await addNewsletter({category, file})
      setMessage(response.message)
      return 
    } catch (error) {
      return setError(error?.message)
    }
  }
  
  const handleChange = (e) => {
    const type = e.target.type
    if (type === 'file') {
      return setFile(e.target.files[0])
    }
    return setCategory(e.target.value)
  }

  return (
    <>
      { error && 
        <div className="toast">
          <div className="alert alert-info">
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
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Agregar una imagen o pdf*</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleChange}
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
            <option disabled defaultValue>Selecciona</option>
            <option value={1}>Lo nuevo</option>
            <option value={2}>Finanzas</option>
            <option value={3}>Deportes</option>
            <option value={4}>Peliculas</option>
          </select>
        </div>
        <div className="form-control w-full max-w-xs my-8">
          <button className="btn btn-primary" type="submit">
            Subscribe
          </button>
        </div>
      </form>
    </>
  )
}

export default NewsletterForm