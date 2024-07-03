"use client"
import React, { useRef } from 'react'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
const Logn_In = () => {

    const router = useRouter();
    const invalidshow = useRef()
    const [data, setdata] = useState("")
    const spinner = useRef()

    const HandleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setdata(prevData => ({
            ...prevData,
            [name]: value
        }));

    }
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            document.getElementById('my_modal_3').close();
            router.replace("/")

        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };
    const isEmail = (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input);
    };
    const HandleSubmit = () => {
        if (!data.email || !data.password) {
            invalidshow.current.innerHTML = "All fields required"
            return
        }
        else if (!isEmail(data.email)) {

            invalidshow.current.innerHTML = "Invalid Email"
        }
        else if (data.password.length < 6) {

            invalidshow.current.innerHTML = "Password should be atleast 6 characters"
            return
        }

        spinner.current.innerHTML = "Loading..."
        signInWithEmailAndPassword(auth, data.email, data.password).then(res => {
            document.getElementById('my_modal_3').close()
            router.replace("/")
            spinner.current.innerHTML = "Login"
        }).catch(err => {
            console.error("Error signing :", err.code, "-", err.message);

            spinner.current.innerHTML = "Login"
            if (err.code === 'auth/invalid-credential') {
                invalidshow.current.innerHTML = "Invalid e-mail or password"
            }
        });
    }

    return (
        <div className="flexer rounded-md  ">
            <div className="bg-[#8B4513] p-8 rounded-lg shadow-md w-full sm:max-w-md">
                <div className="flex flex-col items-center gap-3">
                    <div><img className="w-32" src="user.svg" alt="User Icon" /></div>
                    <h1 className="font-bold text-white text-lg">Login</h1>
                    <label className="flex items-center gap-2 mt-4 border rounded-md  bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="text" className="grow outline-none rounded-md  p-2 " placeholder="Email" onChange={HandleChange} name="email" value={data.email} />
                    </label>
                    <label className="flex  items-center gap-2 mt-4 border rounded-md  bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input type="password" className="grow  outline-none rounded-md p-2 " value={data.password} placeholder="Password" name="password" onChange={HandleChange} />
                    </label>
                    <h4 ref={invalidshow} className="w-full text-white text-center text-xs"></h4>
                    <button ref={spinner} onClick={HandleSubmit} className=" w-64 bg-[#CC5500] hover:bg-[#B64500] text-white py-2 rounded-md  shadow-lg focus:outline-none transition-colors duration-200 focus:bg-[#B64500] ">Login</button>
                    <h1 className="text-sm font-bold text-white">Or with</h1>
                    <button onClick={signInWithGoogle} className=" w-64 bg-[#CC5500] text-white py-2 rounded-md flex items-center justify-center hover:bg-[#B64500] focus:outline-none">
                        <svg className="w-7 h-7 mr-2" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg"><path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" /><path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" /><path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" /><path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" /></svg>
                        Google
                    </button>
                    <h1 className="text-sm font-bold my-2">Don't have an account? <Link className=" text-sm text-white hover:underline" href={"/sign_up"} onClick={() => { document.getElementById('my_modal_3').close(); }}>Sign up</Link></h1>
                </div>
            </div>
        </div>

    )
}

export default Logn_In
