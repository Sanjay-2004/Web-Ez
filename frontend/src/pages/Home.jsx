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

const Home = () => {
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

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    console.log("Signup Data:", signupData)
    setSignupData({
      name: '',
      email: '',
      password: ''
    })
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    console.log("Login Data:", loginData)
    setLoginData({
      email: '',
      password: ''
    })
  }

  return (
    <>
      <div className='h-screen bg-gray-400 items-center'>
        <div className='flex gap-3 pt-36  p-4 items-center'>
          <div className="w-2/3">
            <h1 className='text-[10rem]'>WEB-EZ</h1>
            <p className='text-5xl mb-5'>No-Code Website Generator</p>
            <p className='text-3xl'>Simple & Quick</p>
            <p className='text-3xl'>Generate Websites</p>
          </div>
          <div className="w-1/3 flex items-center justify-center">
            <div className='w-2/3 border border-black rounded-xl shadow-2xl p-5 flex-col gap-5'>
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
