"use client"
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '../lib/firebase';
import toast from 'react-hot-toast';
const PlaceBid = ({ Id, setisPlaceBid, isPlaceBid, highestlowestbid }) => {
    const [bidData, setBidData] = useState({
        name: '',
        phoneNo: '',
        bid: ''
    });
    const [message, setMessage] = useState('');
    const [newBid, setnewBid] = useState({
        specificId: "",
        data:
        {
            BidderId: "",
            Bid: "",
            Name: "",
            PhoneNo: ""
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBidData({
            ...bidData,
            [name]: value
        });
    };

    // AppendBid Fetch Function
    async function AppendBid(params) {

        try {
            const response = await fetch('/api/appendtobidders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
            if(response){
                toast.success('Your bid has been placed successfully!'); 
            }
        } catch (error) {
            setMessage('An error occurred: ' + error.message);
        }
    }

    // Final Function to call
    useEffect(() => {
        if (newBid.data.PhoneNo) {
            setBidData({
                name: '',
                phoneNo: '',
                bid: ''
            });

            setisPlaceBid(!isPlaceBid)
            AppendBid(newBid)
        }
    }, [newBid])

  // Function to check if a string consists only of numbers, spaces, and +
  function isStringOfNumbers(inputString) {
    const phoneNumberPattern = /^[\d\s()+-]+$/;
    
    return phoneNumberPattern.test(inputString);
}



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bidData.name || !bidData.phoneNo || !bidData.bid) {
            setMessage('Please fill out all fields');
            return;
        }
        if (!isStringOfNumbers(bidData.phoneNo)) {
            setMessage('PhoneNo must be correct');
            return;
        }
        if (isNaN(bidData.bid) || bidData.bid <= 0) {
            setMessage('Bid must be a positive number');
            return;
        }
        if (bidData.bid > highestlowestbid.data.highestValueObject.Bid) {
            highestlowestbid.data.highestValueObject.Bid = bidData.bid;
        }
        if (bidData.bid < highestlowestbid.data.lowestValueObject.Bid) {
            highestlowestbid.data.lowestValueObject.Bid = bidData.bid;
        }

        setMessage("")
        
        auth.onAuthStateChanged(user => {
            if (user) {
                setnewBid({
                    specificId: Id,
                    data:
                    {
                        BidderId: user.uid,
                        Bid: bidData.bid,
                        Name: bidData.name,
                        PhoneNo: bidData.phoneNo,
                        uniqueId: uuidv4()
                    }
                })
            }
        })


    };


    return (
        <div className="max-w-md mx-auto shadow-lg rounded-md p-6">
            <h2 className="text-2xl font-semibold  text-white mb-4">Place a Bid</h2>
            <p className="mb-2 text-white  break-all">Highest Bid: {highestlowestbid.data.highestValueObject.Bid} pkr</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-white" htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={bidData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2  rounded-md   outline-none "
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-white" htmlFor="phoneNo">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNo"
                        value={bidData.phoneNo}
                        onChange={handleChange}
                        className="w-full px-4 py-2  rounded-md   outline-none "
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-white" htmlFor="bid">Bid Amount</label>
                    <input
                        type="text"
                        name="bid"
                        value={bidData.bid}
                        onChange={handleChange}
                        className="w-full px-4 py-2  rounded-md   outline-none "
                    />
                </div>

                {message && <div className="mb-2 text-center text-sm text-white">{message}</div>}
                <button
                    type="submit"
                    className="w-full bg-[#CC5500] text-white py-2 px-4 rounded-md hover:bg-[#B64500] outline-none "
                >
                    Place Bid
                </button>
            </form>
        </div>
    );
};

export default PlaceBid;
