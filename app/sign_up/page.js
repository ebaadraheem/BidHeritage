"use client"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../lib/firebase';
import { useRef } from 'react';
const SignUp = () => {
  const [data, setdata] = useState("")
  const invalidshow = useRef()
  const router = useRouter()
  const spinner = useRef()

  const HandleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setdata(prevData => ({
      ...prevData,
      [name]: value
    }));

  }
  const isEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };
  const HandleSubmit = () => {
    if (!data.email || !data.username || !data.password || !data.confirmpass) {
      invalidshow.current.innerHTML = "All fields required"
      return
    }
    else if (!isEmail(data.email)) {

      invalidshow.current.innerHTML = "Invalid e-mail"
    }
    else if (data.password !== data.confirmpass) {
      invalidshow.current.innerHTML = "Password not matched"
      return
    }
    else if (data.username.length < 4 || data.username.length > 10) {
      invalidshow.current.innerHTML = "Username should be between 4 and 10 characters"
      return
    }
    else if (data.password.length < 6 || data.password.length > 14) {

      invalidshow.current.innerHTML = "Password should be between 6 and 14 characters"
      return
    }

    spinner.current.innerHTML = "Loading..."
    createUserWithEmailAndPassword(auth, data.email, data.password).then(res => {
      updateProfile(auth.currentUser, {
        displayName: data.username
      })


      spinner.current.innerHTML = "Sign Up"
      router.replace("/")

    }).catch(err => {
      console.error("Error signing up:", err.code, "-", err.message);

      spinner.current.innerHTML = "Sign Up"
      if (err.code === 'auth/email-already-in-use') {
        invalidshow.current.innerHTML = "Already have user with same e-mail"
      }

    });
  }
  return (
    <div className="bg-[#D2B48C]  min-h-[88vh] flex justify-center items-center">
      <div className="bg-[#8B4513] m-2 p-12 rounded-lg flex items-center flex-col gap-3 w-full max-w-sm">
        <div className="flexer mb-4">
          <img className="w-32 fill-white" src="user.svg" alt="User Icon" />
        </div>
        <h1 className="font-bold text-lg text-white text-center">Sign Up</h1>
        <label className="flex items-center gap-2 mt-4 border rounded-md  bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" className="grow  outline-none p-2 rounded-md" name="username" placeholder="Username" value={data.username} onChange={HandleChange} />
        </label>
        <label className="flex items-center gap-2 mt-4 border rounded-md  bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="email" className="grow  outline-none p-2 rounded-md" name="email" placeholder="Email" value={data.email} onChange={HandleChange} />
        </label>
        <label className="flex items-center gap-2 mt-4 border rounded-md  bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
          </svg>
          <input type="password" className="grow  outline-none p-2 rounded-md" name="password" placeholder="Password" value={data.password} onChange={HandleChange} />
        </label>
        <label className="flex items-center gap-2 mt-4 border rounded-md  bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
          </svg>
          <input type="password" className="grow  outline-none p-2 rounded-md" name="confirmpass" placeholder="Confirm Password" value={data.confirmpass} onChange={HandleChange} />
        </label>
        <h4 ref={invalidshow} className="text-white text-center text-xs mt-2"></h4>
        <button onClick={HandleSubmit} className="w-64 bg-[#CC5500] hover:bg-[#B64500] text-white py-2 rounded-md shadow-lg focus:outline-none transition-colors duration-200 ">
          <span ref={spinner}>Sign Up</span>
        </button>
      </div>
    </div>

  )
}

export default SignUp
