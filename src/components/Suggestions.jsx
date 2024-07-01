import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Suggestions = ({ campaignID }) => {
    const [suggestions, setSuggestions] = useState([])
    const [rar, setRar] = useState([])
    const [roas, setRoas] = useState([])
    const [cpr, setCpr] = useState([])
    const [cpc, setCpc] = useState([])
    const [oclp, setOclp] = useState([])
    const [ctr, setCtr] = useState([])
    const umaxUrl = 'https://umaxxnew-1-d6861606.deta.app'

    const fetchSuggestions = async () => {
        try {
            const response = await axios.get(`${umaxUrl}/suggestions?campaign_id=${campaignID}&tenantId=${localStorage.getItem('tenantId')}`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            })
            setRar(response.data.Data.map(item => item.rar))
            setRoas(response.data.Data.map(item => item.roas))
            setCpr(response.data.Data.map(item => item.cpr))
            setCpc(response.data.Data.map(item => item.cpc))
            setOclp(response.data.Data.map(item => item.oclp))
            setCtr(response.data.Data.map(item => item.ctr))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchSuggestions()
    }, [])

    return (
        <>
            <div className='w-full p-3'>
                <h1 className='text-lg font-semibold mb-3'>Suggestions</h1>
                {rar.map((item, index) => (
                    <div key={index} className={`w-full h-44 ${item.color === 'Warning' ? 'bg-yellow-200' : 'bg-green-200'} p-4 mb-3`}>
                        <h1 className='text-md font-semibold'>{item.title}</h1>
                        <p className='text-sm'>{item.msg}</p>
                        <hr className='my-2 border-black' />
                        <div className='flex gap-10 mb-4'>
                            <h1 className='text-md font-semibold'>Nilai: <span className='text-red-500'>{item.value}</span></h1>
                            <h1 className='text-md font-semibold'>Target: <span className='text-green-500'>{item.target}</span></h1>
                        </div>
                        <h1 className='text-md font-semibold'>Pesan:  <span className='text-sm font-normal'>{item.message}</span></h1>
                    </div>
                ))}
                {roas.map((item, index) => (
                    <div key={index} className={`w-full h-44 ${item.color === 'Warning' ? 'bg-yellow-200' : 'bg-green-200'} p-4 mb-3`}>
                        <h1 className='text-md font-semibold'>{item.title}</h1>
                        <p className='text-sm'>{item.msg}</p>
                        <hr className='my-2 border-black' />
                        <div className='flex gap-10 mb-4'>
                            <h1 className='text-md font-semibold'>Nilai: <span className='text-red-500'>{item.value}</span></h1>
                            <h1 className='text-md font-semibold'>Target: <span className='text-green-500'>{item.target}</span></h1>
                        </div>
                        <h1 className='text-md font-semibold'>Pesan:  <span className='text-sm font-normal'>{item.message}</span></h1>
                    </div>
                ))}
                {cpr.map((item, index) => (
                    <div key={index} className={`w-full h-44 ${item.color === 'Warning' ? 'bg-yellow-200' : 'bg-green-200'} p-4 mb-3`}>
                        <h1 className='text-md font-semibold'>{item.title}</h1>
                        <p className='text-sm'>{item.msg}</p>
                        <hr className='my-2 border-black' />
                        <div className='flex gap-10 mb-4'>
                            <h1 className='text-md font-semibold'>Nilai: <span className='text-red-500'>{item.value}</span></h1>
                            <h1 className='text-md font-semibold'>Target: <span className='text-green-500'>{item.target}</span></h1>
                        </div>
                        <h1 className='text-md font-semibold'>Pesan:  <span className='text-sm font-normal'>{item.message}</span></h1>
                    </div>
                ))}
                {cpc.map((item, index) => (
                    <div key={index} className={`w-full h-44 ${item.color === 'Warning' ? 'bg-yellow-200' : 'bg-green-200'} p-4 mb-3`}>
                        <h1 className='text-md font-semibold'>{item.title}</h1>
                        <p className='text-sm'>{item.msg}</p>
                        <hr className='my-2 border-black' />
                        <div className='flex gap-10 mb-4'>
                            <h1 className='text-md font-semibold'>Nilai: <span className='text-red-500'>{item.value}</span></h1>
                            <h1 className='text-md font-semibold'>Target: <span className='text-green-500'>{item.target}</span></h1>
                        </div>
                        <h1 className='text-md font-semibold'>Pesan:  <span className='text-sm font-normal'>{item.message}</span></h1>
                    </div>
                ))}
                {oclp.map((item, index) => (
                    <div key={index} className={`w-full h-44 ${item.color === 'Warning' ? 'bg-yellow-200' : 'bg-green-200'} p-4 mb-3`}>
                        <h1 className='text-md font-semibold'>{item.title}</h1>
                        <p className='text-sm'>{item.msg}</p>
                        <hr className='my-2 border-black' />
                        <div className='flex gap-10 mb-4'>
                            <h1 className='text-md font-semibold'>Nilai: <span className='text-red-500'>{item.value}</span></h1>
                            <h1 className='text-md font-semibold'>Target: <span className='text-green-500'>{item.target}</span></h1>
                        </div>
                        <h1 className='text-md font-semibold'>Pesan:  <span className='text-sm font-normal'>{item.message}</span></h1>
                    </div>
                ))}
                {ctr.map((item, index) => (
                    <div key={index} className={`w-full h-44 ${item.color === 'Warning' ? 'bg-yellow-200' : 'bg-green-200'} p-4 mb-3`}>
                        <h1 className='text-md font-semibold'>{item.title}</h1>
                        <p className='text-sm'>{item.msg}</p>
                        <hr className='my-2 border-black' />
                        <div className='flex gap-10 mb-4'>
                            <h1 className='text-md font-semibold'>Nilai: <span className='text-red-500'>{item.value}</span></h1>
                            <h1 className='text-md font-semibold'>Target: <span className='text-green-500'>{item.target}</span></h1>
                        </div>
                        <h1 className='text-md font-semibold'>Pesan:  <span className='text-sm font-normal'>{item.message}</span></h1>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Suggestions