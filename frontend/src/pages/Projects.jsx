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
import { useEffect, useState } from 'react'
import axios from 'axios'

const Projects = () => {

    const [projectData, setProjectData] = useState({
        title: '',
        description: ''
    })

    const [projects, setProjects] = useState([])

    const handleProjectChange = (e) => {
        setProjectData({
            ...projectData,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            const URI = `${import.meta.env.VITE_BACKEND_URL}/api/users/projects`;
            try {
                const res = await axios({
                    url: URI,
                    method: "get",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    }
                })
                console.log(res)
                setProjects(res.data.projects)
            } catch (error) {
                console.log(error);
            }
        }

        fetchProjects();
    }, [])

    const handleNewProject = async (e) => {
        e.preventDefault();
        console.log(projectData)
        const URI = `${import.meta.env.VITE_BACKEND_URL}/api/users/create-project`;
        try {
            const res = await axios({
                url: URI,
                method: "post",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                data: {
                    title: projectData.title,
                    description: projectData.description
                }
            })
            console.log(res)
            navigate(`/new-project/${res.data.result}`) // Redirect to new project page
        } catch (error) {
            console.log(error);
        }
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
                                <DialogTitle>Add Project Details</DialogTitle>
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
                    {
                        projects.map((project) => {
                            return <ProjectCard key={project._id} title={project.title} description={project.description} id={project._id} pages={project.pages.length} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Projects
