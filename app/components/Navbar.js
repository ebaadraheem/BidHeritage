"use client"
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '../lib/firebase';
import Logn_In from './Logn_In';
import Category from './Category';
import Contact from './Contact';
import AdminMessages from './AdminMessages';

const Navbar = () => {
  const router = useRouter();
  const [user, setuser] = useState("")
  const [admin, setadmin] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerimg = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isuserdropdown, setisuserdropdown] = useState(false);


  const handleHamburger = () => {
    if (hamburgerimg.current.src.includes("/hamburger.svg")) {
      hamburgerimg.current.src = "/cross.svg";
    } else {
      hamburgerimg.current.src = "/hamburger.svg";
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    handleHamburger();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setuser(user);
        if (user.uid === "wrDw1i4YNaMnzi46MVL918XQWrt1") {
          setadmin(true);
        } else {
          setadmin(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);
  const HandleSignOut = () => {
    auth.signOut().then(() => {
      setuser("")
      router.replace("/")
    }).catch(() => {
      console.error("Error while signing out")
    })

  }

  return (
    <nav className={`bg-[#8B4513] transition-transform  duration-300 p-4 shadow-lg relative`}>

      <div className=" mx-auto flex justify-center max-md:justify-between rounded-lg    items-center">
        <div className="text-white max-md:order-2  md:w-[28%] lg:w-1/3 text-2xl font-bold " onClick={() => router.push('/')}>
          <div className='cursor-pointer inline '>BidHeritage</div>
        </div>
        <div className="hidden md:flex md:items-center md:justify-center lg:w-1/3 md:w-[43%]  space-x-6 ">
          <Link className="text-white hover:text-[#D2B48C] transition-colors duration-200" href={"/"}>Home</Link>
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="text-white flexer hover:text-[#D2B48C] transition-colors duration-200 cursor-pointer">
              Auctions<svg className="w-2.5 h-2.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </div>
            {/* Auctions DropDown */}
            {isDropdownOpen && (
              <ul className=" z-20 absolute divide-y transition-all  duration-300 ease-in-out bg-[#8B4513] border shadow-lg rounded  w-48 text-white">
                <li className={`hover:bg-[#B64500] ${user ? "rounded-t" : "rounded"} py-2 px-4 cursor-pointer`} onClick={() => { router.push('/auctions'); setIsDropdownOpen(!isDropdownOpen) }}>View Auctions</li>
                {user && <li className="hover:bg-[#B64500] rounded-b py-2 px-4 cursor-pointer" onClick={() => { router.push('/post-auction'); setIsDropdownOpen(!isDropdownOpen) }}>Post an Auction</li>}
              </ul>
            )}
          </div>
          <Link className="text-white hover:text-[#D2B48C] transition-colors duration-200" href={"/about"}>About</Link>
          <div onClick={() => { document.getElementById('my_modal_7').showModal(); toggleMenu() }} className="text-white cursor-pointer hover:text-[#D2B48C] transition-colors duration-200" >Contact</div>
        </div>
        <div className="hidden md:w-[28%] lg:w-1/3  md:justify-end md:flex">

          {/*Laptop Size Profile DropDown */}
          {
            user ?
              <div onMouseEnter={() => setisuserdropdown(true)}
                onMouseLeave={() => setisuserdropdown(false)} className="relative  inline-block ">
                <button
                  id="dropdownAvatarNameButton"
                  className="flex items-center  justify-center text-sm pe-1 font-medium  text-white rounded-full hover:text-[#D2B48C]  md:me-0   "
                  type="button"
                >
                  <img className="w-8 h-8 me-2 rounded-full " src={`${user.photoURL ? user.photoURL : "/user.svg"}`} alt="/user.svg" />
                  <div className=' max-w-36 h-6  w-full overflow-hidden m-0  text-start '>{user.displayName}</div>
                  <svg
                    className="w-5 pb-1 h-5 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownAvatarName"
                  className={`z-50 ${isuserdropdown ? 'block' : 'hidden'} border bg-[#8B4513]  rounded-lg shadow w-44 absolute right-0  `}
                >

                  <div className='divide-y '>

                    <div className="px-4 py-3 text-sm  text-white">
                      <div className=" break-words">{user.email}</div>
                    </div>
                    <ul className=" text-sm text-white" aria-labelledby="dropdownAvatarNameButton">
                      <li>
                        <Link href={"/my_posts"} className="block px-4 py-2 hover:bg-[#B64500] transition-colors duration-200 transform  ">My Posts</Link>
                      </li>
                      <li>
                        <Link href={"/profile"} className="block px-4 py-2 hover:bg-[#B64500] transition-colors duration-200 transform  ">My Profile</Link>
                      </li>
                      {admin && <li onClick={() => { document.getElementById('my_modal_5').showModal(); toggleMenu() }} className="block px-4 py-2 hover:bg-[#B64500] transition-colors duration-200 transform  cursor-pointer ">Manage Categories
                      </li>}
                      {admin && <li onClick={() => { document.getElementById('my_modal_8').showModal(); toggleMenu() }} className="block px-4 py-2 hover:bg-[#B64500] transition-colors duration-200 transform  cursor-pointer ">Contact Messages
                      </li>}

                    </ul>
                    <div >
                      <div onClick={() => HandleSignOut()} className="block text-white text-sm px-4 py-2 hover:bg-[#B64500] transition-colors duration-200 transform cursor-pointer rounded-b-md ">Sign Out</div>
                    </div>
                  </div>
                </div>
              </div>

              :
              <div className='  pl-4'>
                <button className="flexer text-center bg-[#CC5500] text-white py-1  px-4  rounded-full shadow-lg hover:bg-[#B64500] transition-colors duration-200" onClick={() => { document.getElementById('my_modal_3').showModal(); toggleMenu() }}>
                  Sign In
                </button>
              </div>
          }
        </div>
        <div className={`md:hidden max-md:order-1 flexer`}>
          <button className="text-white focus:outline-none" onClick={() => toggleMenu()}>
            <img ref={hamburgerimg} className="w-5 h-5" src="/hamburger.svg" alt="Menu" />
          </button>
        </div>

      </div>
      {/* Mobile DropDown */}
      {
        isOpen && (
          <div className={`md:hidden transition-all duration-300 `}>
            <div className="block text-white py-2 mx-3 px-1 hover:bg-[#B64500]" onClick={() => { router.push('/'); toggleMenu(); }}>Home</div>
            <div className="relative">
              <div className="flex items-center text-white py-2 mx-3 px-1 hover:bg-[#B64500] cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                Auctions
                <svg className="w-2.5 h-2.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </div>
              <ul className={`bg-[#8B4513] rounded text-white overflow-hidden  duration-300 ${isDropdownOpen ? 'max-h-40' : 'max-h-0'}`}>
                <li className="hover:bg-[#B64500] py-2 mx-3 px-1 cursor-pointer" onClick={() => { router.push('/auctions'); toggleMenu(); }}>View Auctions</li>
                {user && <li className="hover:bg-[#B64500] py-2 mx-3 px-1 cursor-pointer" onClick={() => { router.push('/post-auction'); toggleMenu(); }}>Post an Auction</li>}
              </ul>
            </div>
            <Link className="block text-white py-2 mx-3 px-1 hover:bg-[#B64500]" href={"/about"} onClick={() => toggleMenu()}>About</Link>
            <div className="block text-white cursor-pointer py-2 mx-3 px-1 hover:bg-[#B64500]" onClick={() => { document.getElementById('my_modal_7').showModal(); toggleMenu() }} >Contact</div>
            {user ? (
              <div onClick={() => setisuserdropdown(!isuserdropdown)} className="relative ml-4 block text-left">
                <button
                  id="dropdownAvatarNameButton"
                  className="flex items-center text-sm pe-1 font-medium text-white rounded-full hover:text-[#D2B48C] md:me-0"
                  type="button"
                >
                  <img className="w-8 h-8 me-2 rounded-full" src={user.photoURL ? user.photoURL : "user.svg"} alt="user.svg" />
                  <div className='max-w-40 h-6 overflow-auto text-start'>{user.displayName}</div>
                  <svg
                    className="w-3 h-3 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {isuserdropdown && (
                  <ul className={`bg-[#8B4513] flex flex-col gap-1 transition-all duration-300 rounded w-full text-white`}>
                    <li>
                      <Link href={"/my_posts"} className="hover:bg-[#B64500] w-full pt-2 py-2 block px-1 cursor-pointer" onClick={() => { toggleMenu(); }}>My Posts</Link>
                    </li>
                    <li>
                      <Link href={"/profile"} className="hover:bg-[#B64500] block pt-2 py-2 px-1 cursor-pointer" onClick={() => { toggleMenu(); }}>My Profile</Link>
                    </li>
                    {admin && (
                      <li onClick={() => { document.getElementById('my_modal_5').showModal(); toggleMenu(); }} className="hover:bg-[#B64500] pt-2 block py-2 px-1 cursor-pointer">Manage Categories</li>
                    )}
                    {admin && (
                      <li onClick={() => { document.getElementById('my_modal_8').showModal(); toggleMenu(); }} className="hover:bg-[#B64500] pt-2 block py-2 px-1 cursor-pointer">Contact Messages</li>
                    )}
                    <li className="flexer w-full bg-[#CC5500] text-white py-2 px-4 mt-2 rounded-full shadow-lg hover:bg-[#B64500] transition-colors duration-200" onClick={() => { HandleSignOut(); toggleMenu(); }}>Sign Out</li>
                  </ul>
                )}
              </div>
            ) : (
              <button className="flexer w-full text-left bg-[#CC5500] text-white py-2 px-4 mt-2 rounded-full shadow-lg hover:bg-[#B64500] transition-colors duration-200" onClick={() => { document.getElementById('my_modal_3').showModal(); toggleMenu(); }}>
                Sign In / Register
              </button>
            )}
          </div>
        )
      }

      {/* LogIn Form */}
      <dialog id="my_modal_3" className=' bg-[#8B4513] w-full max-sm:max-w-md sm:max-w-sm rounded-md'>
        <form method="dialog">
          <button className="absolute top-2 right-2 p-1 rounded-full  hover:bg-[#D2B48C] focus:outline-none">
            <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

        </form>
        <Logn_In />

      </dialog>
      {/* Category Form */}
      <dialog id="my_modal_5" className=' bg-[#D2B48C] w-full shadow-lg max-w-md sm:max-w-sm rounded-md'>
        <form method="dialog">
          <button className="absolute top-2 right-2 p-1 rounded-full  hover:bg-[#F5DEB3]  focus:outline-none">
            <svg className="w-6 h-6 " viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

        </form>
        <Category />

      </dialog>
      {/* Contact Form */}
      <dialog id="my_modal_7" className=' bg-[#D2B48C]  w-full shadow-lg max-w-md sm:max-w-sm rounded-md' >
        <div >
          <form method="dialog">
            <button className="absolute top-2 right-2 p-1 rounded-full  hover:bg-[#F5DEB3]  focus:outline-none">
              <svg className="w-6 h-6 " viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
          <Contact />
        </div>
      </dialog>

      {/* Admin Messages */}
      <dialog id="my_modal_8" className=' bg-[#D2B48C] w-full shadow-lg max-w-md sm:max-w-sm rounded-md' >
        <div >
          <form method="dialog">
            <button className="absolute top-2 right-2 p-1 rounded-full  hover:bg-[#F5DEB3]  focus:outline-none">
              <svg className="w-6 h-6 " viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
          <AdminMessages />
        </div>
      </dialog>



    </nav >
  );
}

export default Navbar;
