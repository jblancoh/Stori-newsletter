'use client'
import { useState } from 'react'
import NewsletterForm from './Forms'
import FormSend from './FormSend'

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0)
  
  const handleClick = (e) => {
    const clickedTab = e.target;
    const tabIndex = Array.from(clickedTab.parentNode.children).indexOf(clickedTab);
    setActiveTab(tabIndex);
  }
  
  return (
    <div className='mx-auto'>
      <div className="tabs">
        <a className={`tab tab-lifted ${activeTab === 0 ? 'tab-active' : ''}`} onClick={handleClick}>Crear</a>
        <a className={`tab tab-lifted ${activeTab === 1 ? 'tab-active' : ''}`} onClick={handleClick}>Enviar</a>
      </div>
      <div className="w-[300px]">
        {activeTab === 0 && (
          <NewsletterForm />
        )}
        {activeTab === 1 && (
          <FormSend />
        )}
      </div>
    </div>
  )
}

export default Tabs