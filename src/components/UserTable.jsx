import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserTable = () => {
    const [tableData, setTableData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const umaxUrl = 'https://umaxxnew-1-d6861606.deta.app';

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get(`${umaxUrl}/user-by-tenant`, {
                headers: {
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
    
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredData = tableData.filter((data) => {
        return (
            (!searchTerm || data.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });
    
    return (
        <div className='pt-3 ps-3 pe-3'>
            <div className='h-screen w-full bg-white rounded-t-lg ps-14 pe-14 pt-5'>
                <div className='font-semibold text-3xl text-slate-800 mb-10'>
                    <h1>Users</h1>
                </div>
                <div className="bg-white border border-gray-300 rounded-lg w-full h-fit p-5">
                    <div className="mb-4 flex flex-row items-center gap-4">
                        <input className="border border-gray-300 rounded-lg px-4 py-2" type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search" />
                    </div>
                    <div className=''>
                        <table className='w-full border'>
                            <thead className='bg-white'>
                                <tr className='text-left'>
                                    <th className='px-4 py-2 border'>Name</th>
                                    <th className='px-4 py-2 border'>Email</th>
                                    <th className='px-4 py-2 border'>Role</th>
                                    <th className='px-4 py-2 border'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((data, index) => (
                                    <tr key={index} className='text-center'>
                                        <td className='px-4 py-2 border'>{data.name}</td>
                                        <td className='px-4 py-2 border'>{data.email}</td>
                                        <td className='px-4 py-2 border'>{data.roles}</td>
                                        <td className='px-4 py-2 border'>
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

export default UserTable

