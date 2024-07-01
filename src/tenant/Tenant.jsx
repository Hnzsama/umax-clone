import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Tenant = () => {
    const [tableData, setTableData] = useState([]);
    const umaxUrl = 'https://umaxxnew-1-d6861606.deta.app';

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get(`${umaxUrl}/tenant-by-id?tenantId=${localStorage.getItem('tenantId')}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setTableData(response.data.Data);
            console.log(response.data.Data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='bg-slate-100 w-full h-screen p-6'>
            <div className="w-full h-full rounded-lg bg-white shadow-md border">
                <div className="head w-full h-16 flex justify-center items-center border-b-2 bg-gray-100">
                    <h1 className='text-xl font-semibold text-gray-700'>
                        Tenant Profile (UNIVERSAL BIG DATA)
                    </h1>      
                </div>
                <div className="body px-10 py-6">
                    <section className='mb-6'>
                        <h1 className='text-lg font-semibold text-gray-800 mb-4'>
                            General Information
                        </h1>
                        <div className="w-full h-fit bg-blue-50 rounded-lg p-6 shadow-sm">
                            <div className="grid grid-cols-2 gap-6 mb-4">
                                <div className='flex flex-col'>
                                    <label htmlFor="company" className="text-gray-600 font-medium">Company</label>
                                    <input type="text" id='company' className="p-2 border-gray-300 border-2 rounded-md" value={tableData[0]?.company} readOnly />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="phone" className="text-gray-600 font-medium">Phone</label>
                                    <input type="text" id='phone' className="p-2 border-gray-300 border-2 rounded-md" value={tableData[0]?.contact} readOnly />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="email" className="text-gray-600 font-medium">Email</label>
                                    <input type="text" id='email' className="p-2 border-gray-300 border-2 rounded-md" value={tableData[0]?.email} readOnly />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="lang" className="text-gray-600 font-medium">Language</label>
                                    <input type="text" id='lang' className="p-2 border-gray-300 border-2 rounded-md" value={tableData[0]?.language} readOnly />
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="address" className="text-gray-600 font-medium">Address</label>
                                <input type="text" id='address' className="p-2 border-gray-300 border-2 rounded-md" value={tableData[0]?.address} readOnly />
                            </div>
                        </div>
                    </section>
                    <section className='mb-6'>
                        <h1 className='text-lg font-semibold text-gray-800 mb-4'>
                            Additional Information
                        </h1>
                        <div className="w-full h-fit bg-blue-50 rounded-lg p-6 shadow-sm">
                            <div className="grid grid-cols-2 gap-6">
                                <div className='flex flex-col'>
                                    <label htmlFor="currency" className="text-gray-600 font-medium">Currency</label>
                                    <input type="text" id='currency' className="p-2 border-gray-300 border-2 rounded-md" value={tableData[0]?.currency} readOnly />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="timezone" className="text-gray-600 font-medium">Timezone</label>
                                    <input type="text" id='timezone' className="p-2 border-gray-300 border-2 rounded-md" value={tableData[0]?.timezone_name} readOnly />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="culture" className="text-gray-600 font-medium">Culture</label>
                                    <input type="text" id='culture' className="p-2 border-gray-300 border-2 rounded-md" value={tableData[0]?.culture} readOnly />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="position" className="text-gray-600 font-medium">Position</label>
                                    <input type="text" id='position' className="p-2 border-gray-300 border-2 rounded-md" value="" readOnly />
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className='w-full h-fit mt-3 flex gap-4 justify-end'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm">Save</button>
                        <Link to="/dashboard"><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm">Cancel</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tenant;
