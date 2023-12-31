'use client'
import { useEffect, useState } from 'react'
import { getNewsletterList, sendNewsletter } from '@/services/newsletter'
import useStore from '@/store'

const FormSend = () => {
    const [newslettersSelected, setNewslettersSelected] = useState(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    
    const newsletters = useStore(state => state.newsletters)
    useEffect(() => {
      const getList = async () => {
        await getNewsletterList()
      }
      getList()
    }, [])
    
    const onSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setMessage(null)
      try {
        const response = await sendNewsletter({ newsletter_category_id: newslettersSelected })
        setMessage(response?.message)
        setLoading(false)
      } catch (error) {
        setError(error?.message)
        setLoading(false)
      }
    }
  
    return (
    <>
        { message && 
          <div className="toast">
            <div className="alert alert-success">
              <span>{message}</span>
            </div>
          </div>
        }
        { error &&
          <div className="toast">
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          </div>
        }
        <form  onSubmit={onSubmit}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Selecciona un newsletter</span>
            </label>
            <select
              className="select select-bordered"
              onChange={(e) => setNewslettersSelected(e.target.value)}
            >
              <option value={''}>Selecciona</option>
              {newsletters?.length > 0 && newsletters?.map((item) => (
                <option key={item?.category_id} value={item?.category_id}>{item.category || 'Sin categoria'}</option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-xs my-8">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              Enviar
            </button>
          </div>
        </form>
    </>
    )
}

export default FormSend