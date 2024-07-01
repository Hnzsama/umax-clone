import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CampaignTable = () => {
    const [tableData, setTableData] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [selectedObjective, setSelectedObjective] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const umaxUrl = 'https://umaxxnew-1-d6861606.deta.app';

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get(`${umaxUrl}/campaign-by-tenant`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setTableData(response.data.Data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    const handlePlatformChange = (event) => {
        setSelectedPlatform(event.target.value);
    }

    const handleObjectiveChange = (event) => {
        setSelectedObjective(event.target.value);
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredData = tableData.filter((data) => {
        return (
            (!selectedPlatform || data.platform === Number(selectedPlatform)) &&
            (!selectedObjective || data.objective === Number(selectedObjective)) &&
            (!searchTerm || data.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });
    
    return (
        <div className='pt-3 ps-3 pe-3'>
            <div className='h-screen w-full bg-white rounded-t-lg ps-14 pe-14 pt-5'>
                <div className='font-semibold text-3xl text-slate-800 mb-10'>
                    <h1>Campaigns</h1>
                </div>
                <div className="bg-white border border-gray-300 rounded-lg w-full h-fit p-5">
                        <div className="mb-4 flex flex-row items-center gap-4">
                            <input className="border border-gray-300 rounded-lg px-4 py-2" style={{width: '200px'}} type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange}/>
                            <select name="" className="border border-gray-300 rounded-lg px-4 py-2" id="" style={{width: '200px'}} value={selectedPlatform} onChange={handlePlatformChange}>
                                <option value="">Platform</option>
                                <option value="1">Meta Ads</option>
                                <option value="2">Google Ads</option>
                                <option value="3">Tiktok Ads</option>
                            </select>
                            <select name="" className="border border-gray-300 rounded-lg px-4 py-2" style={{width: '200px'}} id="" value={selectedObjective} onChange={handleObjectiveChange}>
                                <option value="">Objective</option>
                                <option value="1">Awareness</option>
                                <option value="2">Concervation</option>
                                <option value="3">Consideration</option>
                            </select>
                        </div>
                        <div className=''>
                        <table className='w-full border'>
                            <thead className='bg-white'>
                                <tr className='text-left'>
                                    <th className='px-4 py-2 border'>Name</th>
                                    <th className='px-4 py-2 border'>Client</th>
                                    <th className='px-4 py-2 border'>Platform</th>
                                    <th className='px-4 py-2 border'>Account</th>
                                    <th className='px-4 py-2 border'>Objective</th>
                                    <th className='px-4 py-2 border'>Start Date</th>
                                    <th className='px-4 py-2 border'>Status</th>
                                    <th className='px-4 py-2 border'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((data, index) => (
                                    <tr key={index} className='text-center'>
                                        <td className='px-4 py-2 border'>{data.name}</td>
                                        <td className='px-4 py-2 border'>{data.client_name}</td>
                                        <td className='px-4 py-2 border'>{data.platform === 1 ? 'Meta Ads' : data.platform === 2 ? 'Google Ads' : 'Tiktok Ads'}</td>
                                        <td className='px-4 py-2 border'>{data.account_name}</td>
                                        <td className='px-4 py-2 border'>{data.objective === 1 ? 'Awareness' : data.objective === 2 ? 'Concervation' : 'Consideration'}</td>
                                        <td className='px-4 py-2 border'>{data.start_date}</td>
                                        <td className='px-4 py-2 border'>{data.status === 1 ? 'Active' : data.status === 2 ? 'Draft' : 'Competed'}</td>
                                        <td className='px-4 py-2 border flex'>
                                            <button className='bg-blue-500 text-white px-4 py-2 rounded me-1'>Edit</button>
                                            <button className='bg-red-500 text-white px-4 py-2 rounded'>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
                    </div>
            </div>
        </div>
    )
}

export default CampaignTable
