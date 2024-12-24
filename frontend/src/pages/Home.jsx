import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [signupError, setSignupError] = useState(null);

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    })
  }

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", signupData);
    try {
      const URI = `${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-up`;
      console.log("URI:", URI);
      const res = await axios.post(URI, signupData);
      console.log(res.status);
      console.log(res.message);
      const jwtToken = res.data.token;
      console.log("JWT Token:", jwtToken);
      localStorage.setItem("token", jwtToken);
      navigate("/projects");
    } catch (error) {
      if (error.response) {
        console.error(`Status: ${error.response.status}, Message: ${error.response.data.message}`);
        setSignupError(error.response.data.message);
      } else {
        console.error("Unexpected Error:", error.message);
        setSignupError(error.message);
      }
    }
  };


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-in`, loginData);
      const jwtToken = res.data.token;
      localStorage.setItem("token", jwtToken);
      console.log(res);
      navigate("/projects");
    } catch (error) {
      if (error.response) {
        console.error(`Status: ${error.response.status}, Message: ${error.response.data.message}`);
        setError(error.response.data.message);
      } else {
        console.error("Unexpected Error:", error.message);
        setError(error.message);
      }
    }
  };


  return (
    <>
      <div className='h-screen text-white items-center'>
        <div className='flex max-md:flex-col gap-3 pt-36 pl-10  p-4 items-center'>
          <div className="w-2/3 max-md:flex max-md:flex-col max-md:items-center bg-gradient-to-br from-black to-transparent p-5 shadow-2xl">
            <h1 className="font-semibold text-[10rem] max-md:text-7xl">WEB-EZ</h1>
            <p className="font-semibold text-5xl md:mb-5 max-md:text-center max-md:text-4xl">
              No-Code Website Generator
            </p>
            <p className="font-semibold text-3xl max-md:text-xl">Simple & Quick</p>
            <p className="font-semibold text-3xl max-md:text-xl">Generate Websites</p>
          </div>

          <div className="w-1/3 flex  items-center justify-center">
            <div className='w-2/3 bg-opacity-90 bg-black max-md:w-full border border-black rounded-xl shadow-2xl p-5 flex-col gap-5'>
              {/* Signup Form */}
              <form onSubmit={handleSignupSubmit}>
                <Input
                  name="name"
                  onChange={handleSignupChange}
                  className="bg-gray-300 border-black text-black my-3"
                  type="text"
                  placeholder="Name"
                  required
                />
                <Input
                  name="email"
                  onChange={handleSignupChange}
                  className="bg-gray-300 border-black text-black my-3"
                  type="email"
                  placeholder="Email"
                  required
                />
                <Input
                  name="password"
                  onChange={handleSignupChange}
                  className="bg-gray-300 border-black text-black my-3"
                  type="password"
                  placeholder="Password"
                  required
                />
                <Button type="submit" className="bg-red-400 text-white">
                  Sign-Up
                </Button>
                {signupError && <p className="border-red-900 bg-red-200 px-3 py-1 rounded-sm">{signupError}</p>}
              </form>

              {/* Login Form Trigger */}
              <div className="flex items-center gap-4 mt-2">
                <p className='text-sm'>Already have an account?</p>
                <Dialog>
                  <DialogTrigger className='text-white hover:underline text-sm'>Login</DialogTrigger>
                  {/* Login Form */}
                  <DialogContent className="bg-gray-500">
                    <DialogHeader>
                      <DialogTitle>Login</DialogTitle>
                      <form onSubmit={handleLoginSubmit}>
                        <Input
                          name="email"
                          onChange={handleLoginChange}
                          className="bg-gray-300 border-black text-black my-3"
                          type="email"
                          placeholder="Email"
                          required
                        />
                        <Input
                          name="password"
                          onChange={handleLoginChange}
                          className="bg-gray-300 border-black text-black my-3"
                          type="password"
                          placeholder="Password"
                          required
                        />
                        <Button type="submit" className="bg-red-400 text-white">
                          Login
                        </Button>
                      </form>
                      {error && <p className="border-red-900 bg-red-200 px-3 py-1 rounded-sm">{error}</p>}
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
