import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = ({ ID }) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Jumlah item per halaman
    const umaxUrl = 'https://umaxxnew-1-d6861606.deta.app';

    const getMetricByCampaign = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get(`${umaxUrl}/history?campaign_id=${ID}&tenantId=${localStorage.getItem('tenantId')}`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setData(response.data.Data);
            console.log(response.data.Data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        getMetricByCampaign();
    }, [ID]);

    // Menghitung data yang akan ditampilkan berdasarkan halaman saat ini
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    // Menghitung jumlah halaman
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Fungsi untuk mengubah halaman
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='pt-3 ps-3 pe-3 h-full'>
            {ID === 0 ? (
                <h1>Pilih Campaign</h1>
            ) : (
                <div className='h-full w-full bg-white rounded-t-lg p-1 flex flex-col'>
                    <div className="bg-white border border-gray-300 rounded-lg w-full flex-grow p-5 overflow-auto">
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 border text-nowarp">Last Update</th>
                                        <th scope="col" className="px-6 py-3 border text-nowarp">Amount Spent</th>
                                        <th scope="col" className="px-6 py-3 border text-nowarp">Reach</th>
                                        <th scope="col" className="px-6 py-3 border text-nowarp">Impressions</th>
                                        <th scope="col" className="px-6 py-3 border text-nowarp">Frequency</th>
                                        <th scope="col" className="px-6 py-3 border text-nowarp">RAR</th>
                                        <th scope="col" className="px-6 py-3 border text-nowarp">CPC</th>
                                        <th scope="col" className="px-6 py-3 border text-nowarp">CTR</th>
                                        <th scope="col" className="px-6 py-3 border text-nowarp">OCLP</th>
                                        <th scope="col" className="px-6 py-3 border text-nowarp">CPR</th>
                                        <th scope="col" className="px-6 py-3 border text-nowarp">ATC</th>
                                        <th scope="col" className="px-6 py-3 border text-nowarp">ROAS</th>
                                        <th scope="col" className="px-6 py-3 border text-nowarp">Real ROAS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((item) => (
                                        <tr key={item._id} className='text-center'>
                                            <td className='px-4 py-2 border text-gray-800 text-nowrap'>{item.timestamp_update}</td>
                                            <td className='px-4 py-2 border text-gray-800 text-nowrap'>{item.amountspent}</td>
                                            <td className='px-4 py-2 border text-gray-800 text-nowrap'>{item.reach}</td>
                                            <td className='px-4 py-2 border text-gray-800 text-nowrap'>{item.impressions}</td>
                                            <td className='px-4 py-2 border text-gray-800 text-nowrap'>{item.frequency}</td>
                                            <td className='px-4 py-2 border text-gray-800 text-nowrap'>{item.rar}</td>
                                            <td className='px-4 py-2 border text-gray-800 text-nowrap'>{item.cpc}</td>
                                            <td className='px-4 py-2 border text-gray-800 text-nowrap'>{item.ctr}</td>
                                            <td className='px-4 py-2 border text-gray-800 text-nowrap'>{item.oclp}</td>
                                            <td className='px-4 py-2 border text-gray-800 text-nowrap'>{item.cpr}</td>
                                            <td className='px-4 py-2 border text-gray-800 text-nowrap'>{item.atc}</td>
                                            <td className='px-4 py-2 border text-gray-800 text-nowrap'>{item.roas}</td>
                                            <td className='px-4 py-2 border text-gray-800 text-nowrap'>{item.realroas}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='bg-white border-t border-gray-300 p-4'>
                        <div className='flex justify-center'>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-4 py-2 mx-1 border ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default History;
