"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuction } from '@/app/UserContext/UserContext';
import PlaceBid from '@/app/components/PlaceBid';
import { auth } from '@/app/lib/firebase';
const Description = ({ params }) => {
    const { id } = params;
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [isPlaceBid, setisPlaceBid] = useState(false)
    const [createrid, setcreaterid] = useState('')
    const [biocity, setbiocity] = useState({
        name: "",
        profileimg: "",
        bio: "",
        city: "",
    })
    const [highestlowestbid, sethighestlowestbid] = useState('')
    const { auctions } = useAuction();
    const settings = {
        dots: true,
        infinite: auctions.images > 2,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };


    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                let senddata = {
                    specificId: id
                };
                try {
                    const response = await fetch('/api/highestlowestbidder', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(senddata),
                    });
                    const result = await response.json(); // parse the response
                    if (result.success) {
                    sethighestlowestbid(result.data)
                    } else {
                        console.error("Failed to get data:", result.error);
                    }
                } catch (error) {
                    console.error("An error occurred:", error);
                }
            }
        };

        fetchData();
    }, [id]);



    useEffect(() => {
        if (id) {
            const foundData = auctions.find(auction => auction.specificId == id);
            if (foundData) {
                setcreaterid(foundData.createrId)
                setData(foundData);
            }
        }
    }, [id, auctions]);

    useEffect(() => {
        const fetchBioInfo = async () => {
            if (createrid) {
                try {
                    const Temp = { createrId: createrid };
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
                            name: fetchdt.data.name,
                            profileimg: fetchdt.data.profileimg,
                            bio: fetchdt.data.bio ? fetchdt.data.bio : "",
                            city: fetchdt.data.city ? fetchdt.data.city : "",
                        });
                    } else {
                        console.error('Error fetching bio info:', fetchdt.error);
                    }
                } catch (error) {
                    console.error('Error fetching bio info:', error);
                }
            }
        };

        fetchBioInfo();
    }, [createrid]);


    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage('')
    };

    if (!data) return (
        <div className=' min-h-[100vh] bg-[#D2B48C] flexer '> 
        <svg className="w-8 h-8 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><linearGradient id="a11"><stop offset="0" stop-color="#000000" stop-opacity="0"></stop><stop offset="1" stop-color="#000000"></stop></linearGradient><circle fill="none" stroke="url(#a11)" stroke-width="15" stroke-linecap="round" stroke-dasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70" transform-origin="center"><animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="1.4" values="360;324;288;252;216;180;144;108;72;36" repeatCount="indefinite"></animateTransform></circle></svg>
         </div>
    )
  return (
        <div className='min-h-[100vh] bg-[#D2B48C] py-1'>
            <div className="max-w-4xl min-h-[100vh]  mx-auto p-6 flex flex-col  rounded-lg shadow-lg  ">
                <Slider {...settings} className="mb-6 ">

                    {data.images.map((image, index) => (
                        <div key={index} className="relative  px-2" >
                            <img src={image} alt={`Slide ${index + 1}`} className=" object-contain w-full h-64 sm:h-80  rounded cursor-pointer" />
                            <div className="absolute inset-0  flex justify-end items-end ">
                                <img onClick={() => openModal(image)} src="/full_view.svg" alt="Full View" className="w-10  hover:bg-[#F5DEB3]  rounded-md p-2 cursor-pointer" />
                            </div>
                        </div>
                    ))}
                </Slider>
                <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
                <p className="text-lg text-gray-700  pr-2 mb-4">{data.description}</p>
                <div className="mb-4">
                    {highestlowestbid &&
                        <>
                            {(highestlowestbid.data.lowestValueObject.Bid !== highestlowestbid.data.highestValueObject.Bid) && <div className="text-xl pr-2  text-black font-semibold break-all"><span className=' text-black font-bold'>Lowest Bid :</span>   {highestlowestbid.data.lowestValueObject.Bid} pkr</div>}
                            <div className="text-xl  text-black font-semibold pr-2 break-all"><span className=' text-black font-bold'>Highest Bid :</span>  {highestlowestbid.data.highestValueObject.Bid} pkr</div>
                        </>}
                </div>
                <div>
                    {!auth.currentUser && highestlowestbid.data && <button onClick={() => document.getElementById('my_modal_3').showModal()} className="px-6 py-2 bg-[#CC5500] inline-block text-white font-semibold rounded-lg hover:bg-[#B64500] transition duration-200 mb-4">
                        Login to place bid
                    </button>}
                    {auth.currentUser && highestlowestbid && <button onClick={() => setisPlaceBid(!isPlaceBid)} className="px-6 py-2 bg-[#CC5500] inline-block text-white font-semibold rounded-lg hover:bg-[#B64500] transition duration-200 mb-4">
                        Place a Bid
                    </button>}
                </div>
                <div className=" p-4 rounded-lg shadow-lg">
                    {biocity.name &&
                        <div className=' mb-1 '>
                            <div className='text-xl font-bold mb-2"'>Posted by:</div>
                            <div className="text-gray-700 mt-2 flex gap-2 items-center break-all"> <span className=' w-8'><img onClick={() => openModal(biocity.profileimg)} className=' w-8 rounded-full hover:opacity-75 h-8 cursor-pointer' src={biocity.profileimg ? biocity.profileimg : "/user.svg"} alt="p" /></span> {biocity.name}</div>
                            {biocity.bio && <p className="text-gray-700 break-all"><span className=' text-black font-semibold'>Info:</span> {biocity.bio}</p>}
                            {biocity.city && <p className="text-gray-700 break-all"><span className=' text-black font-semibold'>City:</span> {biocity.city}</p>}
                        </div>
                    }
                    <h2 className="text-xl font-bold mb-2">Owner Details</h2>
                    <p className="text-gray-700"><span className=' text-black font-semibold'>Name:</span> {data.owner.name}</p>
                    <p className="text-gray-700"><span className=' text-black font-semibold'>Phone:</span> {data.owner.phoneNo}</p>
                    {data.owner.email &&
                        <p className="text-gray-700 break-all"><span className=' text-black font-semibold'>E-Mail:</span> {data.owner.email}</p>
                    }
                    {data.owner.address &&
                        <p className="text-gray-700"><span className=' text-black font-semibold'>Address:</span> {data.owner.address}</p>

                    }
                </div>
                <Link className='  mt-auto' href="/auctions">
                    <div className="inline-block mt-4  px-6 py-2 bg-[#CC5500] text-white font-semibold rounded-lg hover:bg-[#B64500] transition duration-200">
                        Back
                    </div>
                </Link>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
                    <div className="relative  rounded shadow-lg" onClick={e => e.stopPropagation()}>
                        <img src={selectedImage} alt="Selected" className="object-contain w-full h-[450px]  rounded" />
                    </div>
                </div>
            )}
            {isPlaceBid && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" >
                    <div className="relative bg-[#8B4513] rounded shadow-lg" onClick={e => e.stopPropagation()}>
                        <button
                            className="absolute top-1 right-1 rounded-full  hover:bg-[#D2B48C] focus:outline-none  p-1 "
                            onClick={() => setisPlaceBid(!isPlaceBid)}
                        >
                            <svg className="w-5 text-white " viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <PlaceBid Id={id} setisPlaceBid={setisPlaceBid} highestlowestbid={highestlowestbid} isPlaceBid={isPlaceBid} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Description;
