import Navbar from '@/components/custom/Navbar'
import ProjectCard from '@/components/custom/ProjectCard'
import { Button } from '@/components/ui/button'
import React from 'react'

const Projects = () => {
    return (
        <>
            <Navbar />
            <div className='p-10'>
                <div className="flex justify-between">
                    <h1 className='text-3xl font-medium'>Your Projects</h1>
                    <Button className='bg-green-500 hover:bg-green-400 text-white  font-bold py-2 px-4 rounded'>Create New Project</Button>
                </div>
                <div className="flex flex-col justify-evenly gap-5 mt-10">
                    <ProjectCard />
                    <ProjectCard />
                </div>
            </div>
        </>
    )
}

export default Projects
