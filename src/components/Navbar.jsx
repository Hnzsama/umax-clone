import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [image, setImage] = useState('')
    const umaxUrl = 'https://umaxxnew-1-d6861606.deta.app'

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${umaxUrl}/user-by-id`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            })
            response.data.Data.map(item => {
                setName(item.name)
                setEmail(item.email)
                setRole(item.roles)
                setImage(item.image)
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }


    return (
        <>
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                            <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Logo" />
                            </div>
                            <div className="hidden md:-ml-4 md:flex md:items-center md:space-x-12">
                            <Link to="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                            <Link to="/campaigns" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Campaigns</Link>
                            <Link to="/accounts" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Accounts</Link>
                            <Link to="/clients" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Clients</Link>
                            </div>
                        </div>
                        <div className="hidden md:flex md:items-center md:space-x-6">
                        <div className="relative inline-block text-left">
                                <div className="flex items-center">
                                    <img
                                        src={`data:image/png;base64, ${image}`}
                                        alt={email}
                                        onClick={toggleDropdown}
                                        className="h-10 w-10 rounded-full cursor-pointer"
                                    />
                                    <button
                                        onClick={toggleDropdown}
                                        className="ml-2 text-sm bg-gray-800 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white px-4 py-2"
                                    >
                                        <div className="text-left">
                                            <span className="block">{name}</span>
                                            <span className="text-xs text-gray-500">{role}</span>
                                        </div>
                                    </button>
                                </div>
                                {isOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <hr className="my-1" />
                                            <Link
                                                to="/user"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                role="menuitem"
                                            >
                                                User
                                            </Link>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                role="menuitem"
                                            >
                                                User Profile
                                            </Link>
                                            <Link
                                                to="/tenant"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                role="menuitem"
                                            >
                                                Tenant
                                            </Link>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                role="menuitem"
                                            >
                                                Sign out
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-expanded="false" aria-label="Main menu">
                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-gray-800 md:bg-transparent`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Dashboard</Link>
                    <Link to="/campaigns" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Campaigns</Link>
                    <Link to="/accounts" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Accounts</Link>
                    <Link to="/clients" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Clients</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar