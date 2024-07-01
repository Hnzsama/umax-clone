import React from 'react'
import Navbar from './../components/Navbar';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

const Dashboard = () => {
    return (
        <>
            <div className='flex flex-col'>
                <header>
                    <Navbar />
                </header>
                <main className='flex'>
                        <Sidebar />
                </main>
            </div>
        </>
    )
}

export default Dashboard