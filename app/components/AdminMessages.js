"use client"
// AdminMessages.js
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/Contact/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({message:"Hello" }),
      });
      const dt = await response.json();
      if (dt.success) {
        setMessages(dt.cards);

      }
      else {
        console.log("Message did not fetched ")
      }

    } catch (error) {
      console.error('Error fetching contact:', error);
    }

  };

  const handleDelete = async (Id) => {
    try {
      const response = await fetch('/api/Contact/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uniqueId: Id }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Message deleted")
        setMessages(messages.filter(post => post.uniqueId !== Id))
      } else {
        console.error('Error deleting:', data.error);
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 h-[500px] sm:h-[600px]  ">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
      <ul className="space-y-4">
        {messages.length === 0 && <div className=' flexer font-semibold  h-[400px] sm:h-[500px]'> <h1>No Message yet</h1></div>}
        {messages && messages.map((message) => (
          <li key={message.uniqueId} className=" p-4 rounded-lg shadow-sm bg-[#F5DEB3]  flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex-1">
              <p className="text-sm text-gray-700"><strong>Name:</strong> {message.name}</p>
              <p className="text-sm text-gray-700 break-all"><strong>Email:</strong> {message.email}</p>
              <p className="text-sm text-gray-700"><strong>Date:</strong> {message.date}</p>
              <p className="text-sm text-gray-700"><strong>Time:</strong> {message.time}</p>
              <p className="text-sm text-gray-700"><strong>Message:</strong> {message.contact_message}</p>
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 transition-all duration-200 text-white py-2 px-4 rounded mt-2 md:mt-0 md:ml-4"
              onClick={() => handleDelete(message.uniqueId)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMessages;
