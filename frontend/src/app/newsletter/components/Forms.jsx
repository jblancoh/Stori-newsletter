'use client'
import { useState, useEffect } from "react"
import useStore from "@/store"
import { addNewsletter } from "@/services/newsletter"
import { getNewsletterList } from "@/services/newsletter"


const NewsletterForm = () => {
  const [category, setCategory] = useState('')
  const [file, setFile] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(null)
  const newsletters = useStore(state => state.newsletters)
  console.log("🚀 ~ file: Forms.jsx:16 ~ NewsletterForm ~ newsletters:", newsletters)
  
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
            required
          >
            {newsletters?.length > 0 && newsletters?.map((item) => (
              <option key={item.category_id} value={item.category_id}>{item.category || 'Sin categoria'}</option>
            ))}
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