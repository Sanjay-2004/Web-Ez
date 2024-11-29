import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem('token');
        navigate('/');
    }
    return (
        <div className='flex justify-between px-10 bg-gray-500 h-16 items-center'>
            <p className='text-2xl font-semibold'>Web-Ez</p>
            <Button onClick={handleLogout} className='bg-red-400 hover:bg-red-500 text-white'>Logout</Button>
        </div>
    )
}

export default Navbar
