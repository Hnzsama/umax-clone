import React from 'react'
import Navbar from '../components/Navbar'
import ClientTable from '../components/ClientTable'

const Clients = () => {
  return (
    <div className='bg-slate-200'>
        <header>
            <Navbar />
        </header>
        <ClientTable/>
    </div>
  )
}

export default Clients