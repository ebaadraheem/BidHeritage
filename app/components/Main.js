"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
const Main = () => {

    const router = useRouter();

    return (
        <div className="flexer  flex-grow bg-[#D2B48C] py-20 relative overflow-hidden">
            <div className="flexer text-center pb-20 flex-col gap-6 flex-grow z-10 relative">
                <h1 className="px-4 text-5xl max-sm:text-4xl text-[#4B2E2E] font-bold tracking-wide drop-shadow-lg">
                    Discover and Bid on Unique Items
                </h1>
                <h2 className="max-sm:w-[80%] w-[60%] xl:w-[40%] text-[#4A4A4A] text-lg leading-relaxed drop-shadow-md">
                    Welcome to BidHeritage, your premier destination for discovering and bidding on a wide range of unique items. Whether you're looking for rare collectibles, antiques, or one-of-a-kind treasures, our platform connects buyers and sellers, ensuring a seamless bidding experience from start to finish.
                </h2>
                <div onClick={() => router.push("/auctions")}>
                    <button className="mt-8 px-8 py-3 bg-[#CC5500] text-white font-semibold rounded-full shadow-lg hover:bg-[#B64500] transition-colors duration-200 transform hover:scale-105">
                        Start Bidding
                    </button>
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#D2B48C] opacity-50 z-0"></div>
            <div className="absolute top-10 left-10 w-40 h-40 bg-[#8B4513] opacity-30 rounded-full mix-blend-multiply"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#A0522D] opacity-30 rounded-full mix-blend-multiply"></div>
        </div>
    );
}

export default Main;
