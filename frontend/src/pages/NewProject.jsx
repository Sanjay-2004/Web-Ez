import Navbar from '@/components/custom/Navbar'
import PageCard from '@/components/custom/PageCard'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NewProject = () => {

    const navigate = useNavigate();

    const handleNewPage = () => {
        console.log('New Page')
        navigate('/new-page')

    }

    return (
        <>
            <Navbar />
            <div className='p-10'>
                <div className="flex justify-between">
                    <h1 className='text-3xl font-medium'>Project Name</h1>
                    <Button className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded'>Save</Button>
                </div>
                <div className="flex flex-col justify-evenly gap-5 mt-10">
                    <PageCard title='Page 1' description='null' />
                </div>
                <div className="flex justify-center mt-5">
                    <Button onClick={handleNewPage} className='bg-green-500 hover:bg-green-400 text-white font-bold  rounded'>Add New Page</Button>
                </div>
            </div>
        </>
    )
}

export default NewProject
