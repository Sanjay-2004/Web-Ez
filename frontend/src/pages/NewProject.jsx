import Navbar from '@/components/custom/Navbar'
import PageCard from '@/components/custom/PageCard'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'

const NewProject = () => {
    const params = useParams().id;

    const navigate = useNavigate();

    const [pages, setPages] = useState([])

    const [pageData, setPageData] = useState({
        title: '',
    })

    const handlePageChange = (e) => {
        setPageData({
            ...pageData,
            [e.target.name]: e.target.value
        })
    }

    const handleNewPage = async (e) => {
        e.preventDefault();
        const URI = `${import.meta.env.VITE_BACKEND_URL}/api/project/create-page/${params}`;
        try {
            const res = await axios({
                url: URI,
                method: "post",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                data: {
                    title: pageData.title
                }
            })
            console.log(res)
            navigate(`/new-page/${params}/${res.data.pageId}`)
        } catch (error) {
            console.log(error);
        }
    }

    const openPage = async (pageId) => {
        navigate(`/new-page/${params}/${pageId}`)
    }

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
                        pages.map((page, index) => {
                            return (
                                <PageCard key={index} title={page.title} description={page.description} openPage={() => openPage(page)} />)
                        })
                    ) : (
                        <p className="text-center text-4xl font-sans text-gray-500">
                            No Pages found. Add a new page to get started.
                        </p>
                    )}
                </div>
                <div className="flex justify-center mt-5">
                    <Dialog>
                        <DialogTrigger className='bg-green-500 hover:bg-green-400 text-white  font-bold py-2 px-4 rounded'>Add New Page</DialogTrigger>
                        {/* Login Form */}
                        <DialogContent className="bg-gray-500">
                            <DialogHeader>
                                <DialogTitle>Add Page Details</DialogTitle>
                                <form onSubmit={handleNewPage}>
                                    <Input
                                        name="title"
                                        className="bg-gray-300 border-black text-black my-3"
                                        type="text"
                                        onChange={handlePageChange}
                                        placeholder="Page Title"
                                        required
                                    />
                                    <Button type="submit" className='bg-green-500 hover:bg-green-400 text-white  font-bold py-2 px-4 rounded'>Create New Page</Button>
                                </form>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div >
        </>
    )
}

export default NewProject
