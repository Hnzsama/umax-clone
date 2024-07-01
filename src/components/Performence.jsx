import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Suggestions from './Suggestions'
import Chart from './Chart'
import Campaigns from './../pages/Campaigns';

const Performence = ({ID}) => {
    const [metrics, setMetrics] = useState([])
    const umaxUrl = 'https://umaxxnew-1-d6861606.deta.app'

    const fetchMetrics = async () => {
        try {
            const response = await axios.get(`${umaxUrl}/metric-by-campaign-id?campaign_id=${ID}&tenantId=${localStorage.getItem('tenantId')}`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            })
            setMetrics(response.data.Data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchMetrics()
    }, [])

    return (
        <>
            {ID === 0 ? (
                <h1>Pilih Campaign</h1>
            )
            : 
            <div className="w-full h-full flex flex-col">
                <div className="top w-full h-fit flex border-b-2 border-black">
                    {metrics.map((item) => (
                        <div className='left w-1/3 h-full mt-10 ps-4'>
                            <div className="w-11/12 h-28 bg-red-200 border-red-500 border-2 rounded-lg mb-5 p-4">
                                <h1>Amountspent</h1>
                                <h1>{item.amountspent}</h1>
                            </div>
                            <div className="w-11/12 h-28 bg-blue-200 border-blue-500 border-2 rounded-lg mb-5 p-4">
                                <h1>Reach Amount Spent Ratio</h1>
                                <h1>{item.rar}</h1>
                            </div>
                            <div className="w-11/12 h-28 bg-yellow-200 border-yellow-500 border-2 rounded-lg mb-5 p-4">
                                <h1>CTR</h1>
                                <h1>{item.ctr}</h1>
                            </div>
                            <div className="w-11/12 h-28 bg-green-200 border-green-500 border-2 rounded-lg mb-5 p-4">
                                <h1>OCLP</h1>
                                <h1>{item.oclp}</h1>
                            </div>
                        </div>
                    ))}
                    <div className="right w-2/3 h-fit mt-10 me-3"> 
                        <Chart key={ID} campaignID={ID}/>
                        {metrics.map((item) => (
                            <div className='flex gap-6 w-full h-fit'>
                                <div className="w-1/4 h-28 bg-red-200 border-red-500 border-2 rounded-lg mb-5 p-4">
                                    <h1>CPR</h1>
                                    <h1>{item.cpr}</h1>
                                </div>
                                <div className="w-1/4 h-28 bg-blue-200 border-blue-500 border-2 rounded-lg mb-5 p-4">
                                    <h1>ATC</h1>
                                    <h1>{item.atc}</h1>
                                </div>
                                <div className="w-1/4 h-28 bg-yellow-200 border-yellow-500 border-2 rounded-lg mb-5 p-4">
                                    <h1>ROAS</h1>
                                    <h1>{item.roas}</h1>
                                </div>
                                <div className="w-1/4 h-28 bg-green-200 border-green-500 border-2 rounded-lg mb-5 p-4">
                                    <h1>Real ROAS</h1>
                                    <h1>{item.realroas}</h1>
                                </div>
                            </div>     
                        ))}
                    </div>
                </div>
                <div className="bottom w-full p-4">
                    <Suggestions key={ID} campaignID={ID}/>
                </div>
            </div>
            } 
        </>
    )
}

export default Performence