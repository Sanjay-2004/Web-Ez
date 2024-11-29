import Navbar from '@/components/custom/Navbar'
import ProjectCard from '@/components/custom/ProjectCard'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'

const Projects = () => {

    const [projectData, setProjectData] = useState({
        title: '',
        description: ''
    })

    const handleProjectChange = (e) => {
        setProjectData({
            ...projectData,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate();

    const handleNewProject = async () => {
        console.log('New Project')
        navigate('/new-project') // Redirect to new project page
    }
    return (
        <>
            <Navbar />
            <div className='p-10'>
                <div className="flex justify-between">
                    <h1 className='text-3xl font-medium'>Your Projects</h1>
                    <Dialog>
                        <DialogTrigger className='bg-green-500 hover:bg-green-400 text-white  font-bold py-2 px-4 rounded'>Create New Project</DialogTrigger>
                        {/* Login Form */}
                        <DialogContent className="bg-gray-500">
                            <DialogHeader>
                                <DialogTitle>Login</DialogTitle>
                                <form onSubmit={handleNewProject}>
                                    <Input
                                        name="title"
                                        className="bg-gray-300 border-black text-black my-3"
                                        type="text"
                                        onChange={handleProjectChange}
                                        placeholder="Project Title"
                                        required
                                    />
                                    <Textarea
                                        name="description"
                                        className="bg-gray-300 border-black text-black my-3"
                                        onChange={handleProjectChange}
                                        placeholder="Type your message here." />
                                    <Button type="submit" className='bg-green-500 hover:bg-green-400 text-white  font-bold py-2 px-4 rounded'>Create New Project</Button>
                                </form>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

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
