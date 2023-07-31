'use client'
import { useEffect, useState } from 'react'
import { getNewsletterList, sendNewsletter } from '@/services/newsletter'
import useStore from '@/store'

const FormSend = () => {
    const [newslettersSelected, setNewslettersSelected] = useState(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
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
      const response = await sendNewsletter({ newsletter_category_id: newslettersSelected })
      setMessage(response?.message)
      setLoading(false)
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
        <form className="mx-auto" onSubmit={onSubmit}>
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
              Enviar
            </button>
          </div>
        </form>
    </>
    )
}

export default FormSend