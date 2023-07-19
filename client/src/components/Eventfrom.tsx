import axios from 'axios';
import React, { useState } from 'react';

export const EventForm = () => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');

  const handleSubmit = (e) => {
    e.preventDefault();
    

    
    try{
      const resp = axios.post(`http://localhost:5000/Events?id=${id}`,{
        
        "Title": title,
        "Date": time,
        "Notes": notes
            
      },{
        headers:{
          Authorization: token
        }
      });

      console.log(resp);


      

    }
    catch(e){
      console.log(e);
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <form className="max-w-md mx-auto p-4 bg-white rounded-lg">
        <h2 className="text-center text-3xl font-semibold text-gray-800 ">Add Event</h2>
        <div className="mt-4">
            <label htmlFor="title" className="mt-2 text-xl text-center text-gray-600 font-bold mb-2">
            Title
            </label>
            <input
            type="text"
            id="title"
            placeholder="Enter Title"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none mt-2 mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div className="mb-4">
            <label htmlFor="time" className="mt-2 text-xl text-center text-gray-600 font-bold mb-2">
            Time
            </label>
            <input
            type="datetime-local"
            id="time"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none mt-2 mb-4"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            />
        </div>
        <div className="mb-4">
            <label htmlFor="notes" className="mt-2 text-xl text-center text-gray-600 font-bold mb-2">
            Notes
            </label>
            <textarea
            id="notes"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none mt-2 mb-4" 
            value={notes}
            placeholder="Make Notes"
            onChange={(e) => setNotes(e.target.value)}
            ></textarea>
        </div>
        <div className="flex justify-end">
            <button
            type="submit"
            className="w-full py-3 px-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none"
            >
            Add Event
            </button>
        </div>
        </form>
      </div>
    </div>
  );
};