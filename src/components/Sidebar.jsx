import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MainContent from './MainContent';

const Sidebar = ({ sidebar }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [campaignID, setCampaignID] = useState(0);
    const [campaigns, setCampaigns] = useState([]);
    const [status, setStatus] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const umaxUrl = 'https://umaxxnew-1-d6861606.deta.app';

    const fetchCampaigns = async () => {
        try {
            const response = await axios.get(`${umaxUrl}/metric-by-tenant-id?tenantId=${localStorage.getItem('tenantId')}&status=${status}`, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            setCampaigns(response.data.Data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, [status]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const filteredCampaigns = campaigns.filter(campaign => {
        if (status === 0) {
            return campaign.campaign_name.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
            return (
                campaign.campaign_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                campaign.campaign_status === status
            );
        }
    });

    return (
        <>
            <div className='flex bg-gray-800'>
                <div className={`h-full ${isOpen ? 'w-72' : 'w-0'} bg-gray-800 transition-all duration-300`} style={{ top: '64px' }}>
                    <ul className={`flex mt-5 ${isOpen ? 'block' : 'hidden'} transition-all duration-300 justify-center`}>
                        <li className='bg-gray-700 p-2 hover:bg-slate-600 transition-all duration-300 rounded-s-lg'><button className='text-gray-300' onClick={() => setStatus(0)}>All</button></li>
                        <li className='bg-gray-700 p-2 hover:bg-slate-600 transition-all duration-300'><button className='text-gray-300' onClick={() => setStatus(2)}>Draft</button></li>
                        <li className='bg-gray-700 p-2 hover:bg-slate-600 transition-all duration-300'><button className='text-gray-300' onClick={() => setStatus(1)}>Active</button></li>
                        <li className='bg-gray-700 p-2 hover:bg-slate-600 transition-all duration-300 rounded-e-lg'><button className='text-gray-300' onClick={() => setStatus(3)}>Completed</button></li>
                    </ul>
                    <div className={`mt-5 ${isOpen ? 'block' : 'hidden'} transition-all duration-300 pe-4 ps-4 rounded-md`}>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full text-white px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-white"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>
                    <div className={`mt-2 ${isOpen ? 'block' : 'hidden'} transition-all duration-300 w-full h-full p-3 flex-grow overflow-y-auto`}>
                        {filteredCampaigns.map((campaign, index) => (
                            <button key={index} onClick={() => setCampaignID(campaign.campaign_id)} className="w-full transition-all duration-300 text-left">
                                <div className="mb-2 bg-gray-700 rounded-lg p-4 flex flex-col gap-2 transition-all duration-300">
                                    <h3 className='text-gray-200'>{campaign.campaign_name}</h3>
                                    <div className="text-sm text-gray-400">
                                        <p>Amountspent : {campaign.amountspent}</p>
                                        <p>Reach : {campaign.reach}</p>
                                        <p>Start Date : {campaign.start_date}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    <hr className="border-2 border-gray-400 rounded-lg" />
                    </div>
                    {/* button ini */}
                    <div className="flex-shrink-0 px-2 py-4">
                        <button onClick={toggleSidebar} className={`fixed top-20 ${isOpen ? 'left-72' : 'left-0'} -ml-6 h-12 w-12 rounded-full transition-all duration-300 bg-gray-900 inline-flex items-center justify-center text-gray-400 hover:text-white`}>
                            <span className="sr-only">Close sidebar</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <MainContent key={campaignID} id={campaignID} Open={isOpen} />
        </>
    );
};

export default Sidebar;


