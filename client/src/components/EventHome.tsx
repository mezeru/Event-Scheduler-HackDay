import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, compareAsc } from 'date-fns'
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
    <div className="flex flex-row justify-between">
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-4xl font-bold bg-clip-text text-transparent">
      {event.Title}
    </div>
    <div>

    
      <p className="mt-2 text-center font-bold text-gray-600 mb-2">
        {format(new Date(event.Date), 'MM/dd/yyyy')}        
      </p>
      <p className="mt-2 text-center font-bold text-gray-600 mb-2">
      {format(new Date(event.Date), 'HH:mm')}       
      </p>
    </div>
    </div>
    <p className="mt-2 text-center text-gray-600 text-xl">{event.Notes}</p>
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

    const sortedEvents = events.sort((a, b) => new Date(a.Date) - new Date(b.Date));

    setEvents(sortedEvents);
    
      
  }, []);

  const EventList = ({ events }) => {
    return (
      <div>
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