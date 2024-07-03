"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { uploadPhotos } from '../api/photomanagement';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

  
const page = () => {
    const router = useRouter()
    const [photos, setPhotos] = useState([]);
    const [user, setuser] = useState({})
    const [uploadedphoto, setuploadedphoto] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        bio: '',
        city: ''
    });
    const [biocity, setbiocity] = useState({ bio: "", city: "" })
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
        auth.onAuthStateChanged(user=>{
          if (user) {
            return
          }
          else{
            router.push("/login_please"); 
          }
        })
     
      }, [auth.currentUser]);
    
    
    useEffect(() => {
        const fetchBioInfo = async (userId) => {
            try {
                const Temp = { createrId: userId };
                const response = await fetch('/api/BioInfo/GetAll', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(Temp),
                });

                const fetchdt = await response.json();

                if (fetchdt.success) {
                    setbiocity({
                        bio: fetchdt.data.bio,
                        city: fetchdt.data.city
                    });
                    setFormData({
                        name: auth.currentUser.displayName,
                        bio: fetchdt.data.bio || "",
                        city: fetchdt.data.city || ""
                    });
                } else {
                    console.error('Error fetching bio info:', fetchdt.error);
                }
            } catch (error) {
                console.error('Error fetching bio info:', error);
            }
        };

        auth.onAuthStateChanged(user => {
            if (user) {
                setuser(user);
                fetchBioInfo(user.uid);
                setuploadedphoto(user.photoURL)
            }
        });
    }, []);

    const handleUpload = async () => {
        try {

            const uploaded = await uploadPhotos(photos);
            if (uploaded) {
                setuploadedphoto(uploaded[0].url)

            }

            setPhotos([]);
        } catch (error) {
            
        }


    };
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
        if (photos) {

            handleUpload()
        }
    }, [photos])

    async function FetchingBioCity() {
        const Temp = {
            createrId: user.uid,
            name:formData.name,
            bio: formData.bio,
            city: formData.city,
            profileimg:uploadedphoto
        }

        await fetch('/api/BioInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Temp),
        });
        
        toast.success("Profile updated!")
    }

    const HandleUpdateProfile = () => {
        if (uploadedphoto != user.photoURL) {
            updateProfile(auth.currentUser, {
                photoURL: uploadedphoto
            }).then(() => {

            }).catch(() => {
                console.error("An error occurred while uploading photo")
            });

        }

        updateProfile(auth.currentUser, {
            displayName: formData.name
        }).then(() => {

        }).catch(() => {
            console.error("An error occurred while Name")
        });
        router.push("/")
        FetchingBioCity()

    }

    return (
        <div className='min-h-[90vh] flex justify-center items-center bg-[#D2B48C]'>
            <div className='bg-[#8B4513] min-h-[90vh] m-2 w-full max-w-[500px] p-6 rounded-lg flex flex-col justify-between'>
                <div>
                    <div className='flexer '>
                        <div className=' max-sm:h-40 max-sm:w-40 hover:opacity-90 cursor-pointer h-48 w-48 mb-4 inline-flex justify-center items-center rounded-full'>
                            <label htmlFor="file-input" className='  rounded-full cursor-pointer'>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden bg-blue-400"
                                    id="file-input"
                                />
                                <img className=' bg-gray-100 max-sm:h-40 max-sm:w-40 h-48 w-48 rounded-full' src={uploadedphoto ? uploadedphoto : "user.svg"} alt="" />
                            </label>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <div>
                            <h1 className='text-center text-xl text-white font-semibold'>Your Profile</h1>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='font-semibold text-white'>Name</h1>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                placeholder='Your Name'
                                onChange={handleChange}
                                className='bg-gray-100 p-1 rounded-lg'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='font-semibold text-white'>About Yourself</h1>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder='Enter about yourself'
                                className='bg-gray-100 p-1 min-h-36 rounded-lg'
                            />
                        </div>
                        <div className='flex pb-2 flex-col gap-2'>
                            <h1 className='font-semibold text-white'>City</h1>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={handleChange}
                                name="city"
                                placeholder='Your City'
                                className='bg-gray-100 p-1 rounded-lg'
                            />
                        </div>
                    </div>
                </div>
                <button
                    disabled={
                        user.displayName === formData.name &&
                        biocity.bio === formData.bio &&
                        biocity.city === formData.city &&
                        uploadedphoto === user.photoURL
                    }
                    onClick={HandleUpdateProfile}
                    className={`w-full text-white py-2 px-4 rounded-full shadow-lg transition-colors duration-200 ${user.displayName === formData.name &&
                        biocity.bio === formData.bio &&
                        biocity.city === formData.city &&
                        uploadedphoto === user.photoURL
                        ? 'bg-[#B64500]'
                        : 'bg-[#CC5500] hover:bg-[#B64500]'
                        }`}
                >
                    Update Profile
                </button>

            </div>
        </div>

    )
}

export default page
