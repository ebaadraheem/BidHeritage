
"use client"
import { createContext, useState, useContext, useEffect } from 'react';
const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const [auctions, setAuctions] = useState([]);
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch("/api/cards");
        if (!response.ok) {
          throw new Error('Failed to fetch auctions');
        }
        const fetchdata = await response.json();
        setAuctions(fetchdata.data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <AuctionContext.Provider value={{ auctions, setAuctions }}>
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuction = () => {
  return useContext(AuctionContext);
};
