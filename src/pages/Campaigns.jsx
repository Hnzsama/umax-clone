import React from 'react'
import Navbar from '../components/Navbar'
import CampaignTable from '../components/CampaignTable'

const Campaigns = () => {
  return (
    <div className='bg-slate-200'>
        <header>
            <Navbar/>
        </header>
        <CampaignTable/>
    </div>
  )
}

export default Campaigns