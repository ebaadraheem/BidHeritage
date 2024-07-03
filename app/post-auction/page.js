"use client"
import React, { useState, useRef, useEffect } from 'react';
import { uploadPhotos, deletePhoto } from '../api/photomanagement';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '../lib/firebase';
import { useAuction } from '../UserContext/UserContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
const Page = () => {
  const router = useRouter()
  const alrt = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const { auctions, setAuctions } = useAuction();
  const [formData, setFormData] = useState({
    specificId: '',
    title: '',
    images: [],
    description: '',
    startingBid: '',
    createrId: '',
    owner: {
      name: '',
      phoneNo: '',
      address: '',
      email: ''
    }
  });
  const [Temp2, setTemp2] = useState({})
  const [Temp, setTemp] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length > 1) {
      setFormData(prevFormData => ({
        ...prevFormData,
        [keys[0]]: {
          ...prevFormData[keys[0]],
          [keys[1]]: value
        }
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        return
      }
      else {
        router.push("/login_please");
      }
    })

  }, [auth.currentUser]);





  // Unique Id creation
  const updateSpecificId = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      specificId: uuidv4(),
    }));
  };




  // Photo Upload Function
  const handleUpload = async () => {

    try {

      const uploaded = await uploadPhotos(photos);
      setUploadedPhotos(uploaded);
      setTemp(prevFormData => ({
        ...prevFormData,
        images: uploaded.map(photo => photo.url)
      }));
      setPhotos([]);
    } catch (error) {
      console.error('Error uploading photos:', error);
    }


  };


  // UseEffect to call final function
  useEffect(() => {
    const uploadData = async () => {
      if (Temp.images && Temp.images.length > 0) {
         toast.success("Your auction has been successfully posted!")
        const response = await fetch('/api/cards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Temp),
        });

        const result = await response.json(); // parse the response
        if (result.success) {

          setAuctions(prevAuctions => [...prevAuctions, Temp]);

        } else {
          console.error("Failed to create card:", result.error);
        }
      }
    };

    uploadData();
  }, [Temp]);

  useEffect(() => {
    // For creating separate collection for Bidders
    if (Temp2.info) {
      fetch('/api/Bidders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Temp2),
      });
    }

  }, [Temp2])

  async function FetchingBioCity(Id, Name, img) {
    const Temp = {
      createrId: Id,
      name: Name,
      profileimg: img ? img : ""
    }
    await fetch('/api/BioInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Temp),
    });
  }

  // Function to check if a string consists only of numbers, spaces, and +
  function isStringOfNumbers(inputString) {
    const phoneNumberPattern = /^[\d\s()+-]+$/;
    
    return phoneNumberPattern.test(inputString);
}

  // Handle Submit Function
  const handleSubmit = () => {
    const { title, description, startingBid, owner } = formData;
    const titleWordCount = title.trim().split(/\s+/).length;
    const descriptionWordCount = description.trim().split(/\s+/).length;

    if (!title || !description || !owner.name.trim() || isNaN(startingBid) || startingBid <= 0) {
      alrt.current.innerHTML = "Please fill out all required fields";
      return;
    }
    if (titleWordCount < 3) {
      alrt.current.innerHTML = "Title should be at least 3 words";
      return;
    }
    if (photos.length < 1) {
      alrt.current.innerHTML = "Please upload at least one photo";
      return;
    }
    if (descriptionWordCount < 5) {
      alrt.current.innerHTML = "Description should be at least 5 words";
      return;
    }
    if (!isStringOfNumbers(owner.phoneNo)) {
      alrt.current.innerHTML = "Please write Phone Number correctly";
      return;
    }
    let tempuser = { BidderId: '', Bid: formData.startingBid, Name: formData.owner.name, PhoneNo: formData.owner.phoneNo, uniqueId: uuidv4() }
    auth.onAuthStateChanged(user => {
      if (user) {
        tempuser.BidderId = user.uid
        formData.createrId = user.uid
        FetchingBioCity(user.uid, user.displayName, user.photoURL)
      }
    })
    setTemp2({
      specificId: formData.specificId,
      info: [
        tempuser
      ]
    })
    
    setTemp(formData)
    setFormData({
      specificId: '',
      title: '',
      description: '',
      startingBid: '',
      createrId: '',
      owner: {
        name: '',
        phoneNo: '',
        address: '',
        email: ''
      }
    });
    alrt.current.innerHTML = ""
    handleUpload();
  };



  // Uploaded Photo Storage Function
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileDataPromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            name: file.name,
            type: file.type,
            data: reader.result,
          });
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    });

    Promise.all(fileDataPromises)
      .then(data => {
        setPhotos(data);
      })
      .catch(error => {
        console.error('Error reading files:', error);
      });
  };

  useEffect(() => {
    if (!formData.specificId) {
      updateSpecificId()

    }
  }, [Temp])

  return (
    <div className='min-h-[90vh] flex justify-center items-center bg-[#D2B48C]'>
      <div className='bg-[#8B4513] m-2 w-full max-w-[600px] p-6 rounded-lg'>

        <label htmlFor="file-input" >
          <div className='  bg-[#D2B48C]   cursor-pointer h-72 w-full mb-4 flex justify-center items-center rounded-lg'>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden w-full h-full"
              id="file-input"
            />
            <img className='w-28' src={photos.length > 0 ? "tick.svg" : "upload.svg"} alt="Upload icon" />
          </div>
        </label>

        <div className='space-y-4'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold text-white'>Title</h1>
            <input
              type="text"
              name="title"
              placeholder='Enter title'
              value={formData.title}
              onChange={handleChange}
              className='border bg-[#D2B48C]   p-2 rounded-lg'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-bold text-white'>Description</h1>
            <textarea
              name="description"
              placeholder='Enter description'
              value={formData.description}
              onChange={handleChange}
              className='border bg-[#D2B48C]  p-2 min-h-52 rounded-lg'
            />
          </div>
          <div className='flex items-center  gap-2'>
            <div className='flex flex-col w-24'>
              <h1 className='font-semibold text-white'>Starting Bid:</h1>
            </div>
            <input
              type="number"
              name="startingBid"
              placeholder='Enter starting bid'
              value={formData.startingBid}
              onChange={handleChange}
              className='border bg-[#D2B48C]  max-sm:w-40 p-1 rounded-lg flex-1'
            />
            <span className=' flexer text-white'>pkr</span>
          </div>
          <div className='text-lg font-semibold mt-4 text-white'>
            Owner's Information
          </div>
          <div className='flex items-center gap-2'>
            <h1 className='font-semibold w-20 text-white'>Name:</h1>
            <input
              type="text"
              name="owner.name"
              placeholder='Enter your name'
              value={formData.owner.name}
              onChange={handleChange}
              className='border bg-[#D2B48C]  p-1 max-sm:w-40 rounded-lg flex-1'
            />
          </div>
          <div className='flex items-center gap-2'>
            <h1 className='font-semibold w-20 text-white'>Phone No:</h1>
            <input
              type="text"
              name="owner.phoneNo"
              placeholder='Enter your phone number'
              value={formData.owner.phoneNo}
              onChange={handleChange}
              className='border max-sm:w-40 bg-[#D2B48C] p-1 rounded-lg flex-1'
            />
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex flex-col w-20'>
              <h1 className='font-semibold text-white'>Address:</h1>
              <h1 className='text-sm text-white'>(Optional)</h1>
            </div>
            <input
              type="text"
              name="owner.address"
              placeholder='Enter your address'
              value={formData.owner.address}
              onChange={handleChange}
              className='border max-sm:w-40  bg-[#D2B48C] p-1 rounded-lg flex-1'
            />
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex flex-col w-20'>
              <h1 className='font-semibold text-white'>E-Mail:</h1>
              <h1 className='text-sm text-white'>(Optional)</h1>
            </div>
            <input
              type="email"
              name="owner.email"
              placeholder='Enter your E-Mail'
              value={formData.owner.email}
              onChange={handleChange}
              className='border max-sm:w-40 bg-[#D2B48C]  p-1 rounded-lg flex-1'
            />
          </div>
          <div className='mt-1 flex flex-col gap-1'>
            <div ref={alrt} className=' text-white text-sm flexer'></div>
            <button
              className="flexer w-full text-left bg-[#CC5500] text-white py-2 px-4  rounded-full shadow-lg hover:bg-[#B64500] transition-colors duration-200"
              onClick={handleSubmit}
            >
              Post Auction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
