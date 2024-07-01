import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Setting = ({ID}) => {
    const [data, setData] = useState([]);
    const umaxUrl = 'https://umaxxnew-1-d6861606.deta.app';

    const getMetricByCampaign = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get(`${umaxUrl}/metrics-settings-by?campaign_id=${ID}&tenantId=${localStorage.getItem('tenantId')}`, {
                headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`,
                },
            });
            setData([response.data.Data[0]]);
            console.log(response.data.Data[0]);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }

    useEffect(() => {
        getMetricByCampaign();
    }, [])

    return (
        <div className='pt-3 ps-3 pe-3'>
            {ID === 0 ? (
                <h1>Pilih Campaign</h1>
            ) : (
                <div className='h-screen w-full bg-white rounded-t-lg p-1'>
                    <div className="bg-white border border-gray-300 rounded-lg w-full h-fit">
                        {data.map((item, index) => (
                            <div className='p-8 flex flex-col gap-10'>
                                <div className='flex gap-20'>
                                    <div className="flex flex-col gap-0">
                                        <p>Reach Amount Ratio (RAR)</p>
                                        <p className='text-sm'>Recommended value {'>'} 5%</p>
                                    </div>
                                    <input type="text" className='border p-2 rounded-s-lg' value={item.rar}/>
                                </div>
                                <div className='flex gap-20'>
                                    <div className="flex flex-col gap-0">
                                        <p>Click Through Rate (CTR)</p>
                                        <p className='text-sm'>Recommended value {'>'} 1.5%</p>
                                    </div>
                                    <input type="text" className='border p-2 rounded-s-lg' value={item.ctr}/>
                                </div>
                                <div className='flex gap-20'>
                                    <div className="flex flex-col gap-0">
                                        <p>Outbont Click Landing Page (OCLP)</p>
                                        <p className='text-sm'>Recommended value {'>'} 80%</p>
                                    </div>
                                    <input type="text" className='border p-2 rounded-s-lg' value={item.oclp} />
                                </div>
                                <div className='flex gap-20'>
                                    <div className="flex flex-col gap-0">
                                        <p>Return on AD Spent (ROAS)</p>
                                        <p className='text-sm'>Recommended value {'>'} 3.0x</p>
                                    </div>
                                    <input type="text" className='border p-2 rounded-s-lg' value={item.roas} />
                                </div>
                                <div className='flex gap-20'>
                                    <div className="flex flex-col gap-0">
                                        <p>Cost per Result (CPR)</p>
                                        <p className='text-sm'>Recommended value {'<'} Rp. 5000</p>
                                    </div>
                                    <input type="text" className='border p-2 rounded-e-lg' value={item.cpr} />
                                </div>
                                <div className='flex gap-20'>
                                    <div className="flex flex-col gap-0">
                                        <p>Cost per Click (CPC)</p>
                                        <p className='text-sm'>Recommended value {'<'} Rp. 1000</p>
                                    </div>
                                    <input type="number" className='border p-2 rounded-e-lg' value={item.cpc} />
                                </div>
                                <button className='bg-blue-500 text-white p-2 rounded-lg'>Save</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Setting

