import React, { useState } from 'react'
import Performence from './Performence'
import Metrics from './Metrics';
import History from './History';
import Setting from './Setting';

const MainContent = ({Open, id}) => {
    const [page, setPage] = useState(1);

    return (
        <>
            <div className={`${Open ? `w-[calc(100%-288px)]` : 'w-full'} flex flex-col h-fit`}>
                <nav className={`w-full flex justify-center h-fit bg-gray-500 border-b border-gray-200`}>
                    <div className="mx-auto px-2 pb-4">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:ml-6 sm:block mt-4">
                                    <div className="flex space-x-4">
                                        <button className="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-gray-600" onClick={() => setPage(1) }>Performence</button>
                                        <button className="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-gray-600" onClick={() => setPage(2)}>Metrics</button>
                                        <button className="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-gray-600" onClick={() => setPage(3)}>History</button>
                                        <button className="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-gray-600" onClick={() => setPage(4)}>Setting</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className='w-full flex flex-col'>
                    {page === 1 && <Performence ID={id} />}
                    {page === 2 && <Metrics ID={id} />}
                    {page === 3 && <History ID={id} />}
                    {page === 4 && <Setting ID={id} />}
                </div>
            </div>
        </>
    )
}

export default MainContent