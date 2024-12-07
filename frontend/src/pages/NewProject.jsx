import Navbar from '@/components/custom/Navbar'
import PageCard from '@/components/custom/PageCard'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const NewProject = () => {

    const navigate = useNavigate();

    const [pages, setPages] = useState([])

    const handleNewPage = () => {
        console.log('New Page')
        navigate('/new-page')
    }

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

    const params = useParams().id;
    // console.log("Params: ", params)

    useEffect(() => {
        const getAllPages = async () => {
            // console.log("Getting all pages")
            const URI = `${import.meta.env.VITE_BACKEND_URL}/api/project/pages/${params}`;
            try {
                const res = await axios({
                    url: URI,
                    method: "get",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    }
                })
                console.log("Result:", res)
                setPages(res.data)
            } catch (error) {
                console.log(error);
            }
        }

        getAllPages();
    }, [])

    return (
        <>
            <Navbar />
            <div className='p-10'>
                <div className="flex justify-between">
                    <h1 className='text-3xl font-medium'>Project Name</h1>
                    <Button className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded'>Save</Button>
                </div>
                <div className="flex flex-col justify-evenly gap-5 mt-10">
                    {/* <PageCard title='Page 1' description='null' /> */}
                    {pages.length > 0 ? (
                        pages.map((page, index) => (
                            <PageCard key={index} title={page.title} description={page.description} />
                        ))
                    ) : (
                        <p className="text-center text-4xl font-sans text-gray-500">
                            No Pages found. Add a new page to get started.
                        </p>
                    )}
                </div>
                <div className="flex justify-center mt-5">
                    <Button onClick={handleNewPage} className='bg-green-500 hover:bg-green-400 text-white font-bold  rounded'>Add New Page</Button>
                </div>
            </div >
        </>
    )
}

export default NewProject
