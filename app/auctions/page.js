"use client"
import React from 'react'
import Card from '../components/Card';
import { useState, useEffect } from 'react';
import { useAuction } from '../UserContext/UserContext';
const Auction = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [auctionsdata, setauctionsdata] = useState([])
  const [Query, setQuery] = useState("")
  const [categoryitems, setcategoryitems] = useState([])
  const [categories, setcategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { auctions } = useAuction();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);

  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  useEffect(() => {
    if (auctions) {
      setauctionsdata(auctions)
      setcategoryitems(auctions)
    }
  }, [auctions, categories])


  // Filter Function
  const getFilteredItems = () => {
    if (!Query) {
      setauctionsdata(categoryitems)
    }
    else {
      setauctionsdata(categoryitems.filter((item) =>
        item.title.toLowerCase().includes(Query.toLowerCase())
      ));
    }
  };


  // category Filter Function
  const getcategoryitems = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setauctionsdata(auctions);
      setcategoryitems(auctions)
    }
    else {
      const lowerQuery = category.toLowerCase();
      const filteredData = auctions.filter((item) => {
        const lowerTitle = item.title.toLowerCase();

        if (lowerTitle.includes(lowerQuery.slice(0, 4))) {
          return true;
        }
      });
      setauctionsdata(filteredData);
      setcategoryitems(filteredData)
    }
    setQuery("")
  };


  // Fetch categories from the backend when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category/all', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({message:"Hello" }),
      });
        const data = await response.json();
        if (data.success) {
          setcategories(data.categories);
        } else {
          console.error('Error fetching categories:', data.error);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);


  useEffect(() => {

    getFilteredItems()
  }, [Query, setQuery])




  return (
    <div className="min-h-[100vh] flex bg-[#D2B48C]">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 max-w-[25vw] bg-[#8B4513] z-50 transition-transform duration-300 ${showSidebar ? 'translate-x-0' : '-translate-x-full'
          } max-w-[450px] min-w-60 min-h-[100vh] lg:translate-x-0 lg:relative lg:flex lg:flex-col lg:justify-start lg:items-start  lg:transition-none`}
      >
        <div className="p-4  w-full max-lg:fixed">
          <h2 className="font-semibold ml-1 mb-2 text-white">Categories</h2>
          <ul className="space-y-1  w-full">

            <li onClick={() => getcategoryitems("All")} className={` cursor-pointer w-full block p-2 rounded-md ${selectedCategory === "All" ? "bg-[#CC5500] transition-colors shadow-lg duration-200" : "bg-[#F5DEB3]"
              }`}>All</li>
            {categories && categories.map((cat, index) => (
              <li onClick={() => getcategoryitems(cat)} key={index} className={` cursor-pointer  w-full block p-2 rounded-md ${selectedCategory === cat ? "bg-[#CC5500] transition-colors shadow-lg duration-200" : "bg-[#F5DEB3]"
                }`}>{cat}</li>
            )

            )}
          </ul>
        </div>
      </div>
      <div className="right  w-[100vw] ">
        <div className='  min-h-14 flex items-center justify-between  px-2 md:px-4 md:pr-8'>

          <div onClick={() => toggleSidebar()} className=' lg:hidden p-2 hover:cursor-pointer '>
            <button

              className='bg-[#8B4513] text-white p-2  rounded-md shadow-md'>
              Category
            </button>
          </div>
          <div className='max-lg:hidden p-2'>
            <div className="text-3xl mt-2  max-md:text-xl  font-semibold">Available</div>

          </div>

          {/* Search Bar */}
          <div className='flex justify-center p-2'>
            <div className='flex items-center bg-[#F5DEB3] rounded-md shadow-md'>
              <input
                className='outline-none p-2 w-40 md:w-60 bg-[#F5DEB3] text-[#4B2E2E] placeholder-[#4A4A4A] rounded-l-md'
                type="search"
                name="search"
                id="search"
                value={Query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search'
              />
              <div className='flex items-center justify-center  p-2 rounded-r-md'>
                <img className='w-5 h-5' src="search.svg" alt="search icon" />
              </div>
            </div>
          </div>

        </div>
        <div>
          <div className="text-2xl mx-4 md:mx-6 max-md:text-xl lg:hidden font-semibold">Available</div>
          <div className={`flexer  ${auctionsdata.length === 0 && "min-h-[80vh]"}`} >
            {auctionsdata.length === 0 && <div className=' w-full font-semibold flexer h-[75vh] '>
              <div>No items to show</div> 
              </div>}

            <div className=' flex-wrap max-sm:p-1 sm:p-4  flex items-center  max-w-[1800px] justify-center max-md:flex-col '>

              {/* Cards Display */}
              {auctionsdata.length > 0 && auctionsdata.map((info) => (
                <Card key={info.specificId} params={info} />
              ))}
            </div>
          </div>
        </div>

      </div>
      {showSidebar && (
        <div
          className="fixed top-0 left-0 bottom-0 right-0 bg-black opacity-50 z-30"
          onClick={closeSidebar}
        />
      )}
    </div>

  )
}

export default Auction
