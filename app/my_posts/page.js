"use client"
import React, { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const MyPosts = () => {
    const router = useRouter()
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState(""); 
    const [bidders, setBidders] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
                fetchUserPosts(user.uid);
            }
        });
    }, []);

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



    const fetchUserPosts = async (id) => {
        try {
            const response = await fetch('/api/cards/userposts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Id: id }),
            });
            const data = await response.json();
            if (data.success) {
                setPosts(data.data);
            } else {
                console.error('Error fetching cards:', data.error);
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    useEffect(() => {
        if (posts.length > 0) {
            const specificIds = posts.map(post => post.specificId);
            fetchBidders(specificIds);
        }
    }, [posts]);

    const fetchBidders = async (specificIds) => {
        try {
            const response = await fetch('/api/Bidders/getbidders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Id: specificIds }),
            });
            const data = await response.json();
            if (data.success) {
                setBidders(data.data);
            } else {
                console.error('Error fetching bidders:', data.error);
            }
        } catch (error) {
            console.error('Error fetching bidders:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            const response = await fetch('/api/cards/deletecard', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId }),
            });
            const data = await response.json();
            if (data.success) {
                setPosts(posts.filter(post => post.specificId !== postId))
                toast.success("Post has been deleted!")
            } else {
                console.error('Error deleting:', data.error);
            }
        } catch (error) {
            console.error('Error deleting:', error);
        }

    };

    const handleDeleteBidder = async (postId, bidderId) => {
        try {
            const senddata = { specificId: postId, uniqueId: bidderId }
            const response = await fetch('/api/Bidders/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ senddata }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success("Bidder removed!")
                setBidders(bidders.map(bidder => {
                    bidder.info = bidder.info.filter(info => info.uniqueId !== bidderId);
                    return bidder;
                }));
            } else {
                console.error('Error deleting:', data.error);
            }
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };


    return (
        <div className="container mx-auto px-4 min-h-[100vh] bg-[#D2B48C] py-8">
            <h1 className="text-3xl font-bold mb-6">My Posts</h1>
            {posts.length === 0 ? (
                <div className=' flexer font-semibold  h-[75vh]'><h1>No posts found.</h1></div>
            ) : (
                posts.map(post => (
                    <div key={post.specificId} className=" bg-[#F5DEB3] shadow-md rounded-lg p-4 mb-6">
                        {post.images && (
                            <div className=' max-sm:flex max-sm:justify-center'>
                                <img src={post.images[0]} alt={post.title} className="w-full max-w-48 max-sm:max-w-80 h-auto rounded-lg mb-2 sm:mb-4" />
                            </div>
                        )}
                        <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>

                        <p className="text-gray-700 mb-2 sm:mb-4">{post.description}</p>
                        <button
                            className="bg-red-500 hover:bg-red-600 transition duration-200  text-white py-2 px-4 rounded mb-2 sm:mb-4"
                            onClick={() => handleDeletePost(post.specificId)}
                        >
                            Delete Post
                        </button>
                        <h3 className="text-xl font-semibold mb-2">Bidders</h3>
                        {bidders.filter(bidder => bidder.specificId === post.specificId).length === 0 ? (
                            <p>No bidders found.</p>
                        ) : (
                            bidders.filter(bidder => bidder.specificId === post.specificId).map(bidder =>
                                bidder.info.map(bidderInfo => (
                                    <div key={bidderInfo.uniqueId} className="flex flex-wrap justify-between items-center py-2 ">
                                        <div className='flex flex-col w-full sm:w-[25%] p-1'>
                                            <h1 className="text-gray-700 font-semibold">Name:</h1>
                                            <h1 className="text-gray-700 break-words">{bidderInfo.Name}</h1>
                                        </div>
                                        <div className='flex flex-col w-full sm:w-[25%] p-1'>
                                            <h1 className="text-gray-700 font-semibold">Bid:</h1>
                                            <h1 className="text-gray-700 break-words">{bidderInfo.Bid} pkr</h1>
                                        </div>
                                        <div className='flex flex-col w-full sm:w-[25%] p-1'>
                                            <h1 className="text-gray-700 font-semibold">Phone No:</h1>
                                            <h1 className="text-gray-700 break-words">{bidderInfo.PhoneNo}</h1>
                                        </div>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 transition duration-200 text-white py-1 px-2 rounded w-full sm:w-auto mt-2 sm:mt-0"
                                            onClick={() => handleDeleteBidder(post.specificId, bidderInfo.uniqueId)}
                                        >
                                            Remove Bidder
                                        </button>
                                    </div>
                                ))
                            )
                        )}
                    </div>
                ))
            )}
        </div>

    );
};

export default MyPosts;
