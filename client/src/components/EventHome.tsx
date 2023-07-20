import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, compareAsc } from 'date-fns'
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {

  const handleDelete = async (e) => {

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token')
  

    const resp = await axios.delete(`http://localhost:5000/Events?id=${id}&Event=${e}`,{
      headers:{
        Authorization: token
      }
    })

    if(resp.status == 200){
      window.location.reload();
    }
    

  }

  

  return (

    
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-3">
    <div className="p-4">
      <div className="flex flex-row justify-between">
      <div>
        <h3 className="text-3xl font-semibold mb-2">{event.Title}</h3>
        <p className="text-gray-600 text-sm mb-4">
        
          {event.Notes}
        </p>
      </div>
      <div className="flex items-center justify-center">
      <button
              className="py-2 px-4 text-white text-sm bg-red-500 rounded-md hover:bg-red-600 focus:bg-red-700 focus:outline-none "
              onClick={() => {handleDelete(event._id)}}
            >
              Delete
            </button>
      </div>
      </div>
      <div className="flex items-center justify-between">
        
        <div>
          <p className="text-gray-500 text-sm">Date</p>
          <p className="text-gray-800 font-semibold">{format(new Date(event.Date), 'MM/dd/yyyy')} </p>
        </div>
        
        <div>
          <p className="text-gray-500 text-sm">Time</p>
          <p className="text-gray-800 font-semibold">{format(new Date(event.Date), 'HH:mm')}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Location</p>
          <p className="text-gray-800 font-semibold">{event.Location}</p>
        </div>

      </div>
      
    </div>
  </div>
  );
};



export const EventContainer = () => {
  const [events, setEvents] = useState([]);
  const [state, setState] = useState(true)

  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token')

  const navigate = useNavigate();

  useEffect(() => {

    const getData = async () => {

        const resp = await axios.get(`http://localhost:5000/Events?id=${id}`,{
            headers:{
                Authorization: token
            }
        })

        setEvents(resp.data);

    }

    getData();

    const sortedEvents = events.sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
    
      if (state) {
        return dateA - dateB; // Sort in ascending order
      } else {
        return dateB - dateA; // Sort in descending order
      }
    });

    setEvents(sortedEvents);
    
      
  }, []);

  const EventList = ({ events }) => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {events.map((event) => {
  
        const eventDate = new Date(event.Date); 
        const today = new Date();
  
        if(state){
          if(eventDate >= today){
            return <EventCard key={event._id} event={event} />
          }
        }else
        {
          if(eventDate < today){
            return <EventCard key={event._id} event={event} />
          }
        }
         
  })}
      </div>
    );
  };

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">    
      <div className="container mx-auto py-8">
    
        <h1 className="text-center text-5xl font-bold text-gray-800 mb-10 text-white">
        {state ? 'Upcoming Events' : 'Past Events'}
        </h1>
        <div className="flex justify-center items-center m-4">
        <button
              className="py-3 px-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none m-2"
              onClick={() => navigate('/newEvent')}
            >
              Add New Event
            </button>
            <button
              className="py-3 px-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none m-2"
              onClick={() => setState(!state)}
            >
              {state ? 'Past Events' : 'Upcoming Events'}
            </button>
        </div>
       
        <EventList events={events} />
      </div>
    </div>
  );
};