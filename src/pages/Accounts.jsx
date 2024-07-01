import React from 'react'
import Navbar from '../components/Navbar'
import AccountTable from '../components/AccountTable'

const Accounts = () => {
  return (
    <div className='bg-slate-200'>
        <header>
            <Navbar />
        </header>
        <AccountTable />
    </div>
  )
}

export default Accounts