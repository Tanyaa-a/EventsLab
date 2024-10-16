import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/events'); 
                setEvents(response.data.events); 
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleAddEvent = () => {
        navigate('/add-event'); 
    };

    return (
        <div>
            <h1>Events</h1>
            <button 
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                onClick={handleAddEvent}
            >
                Add Your Event
            </button>
            <div className="events">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event._id} className="event-card">
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                            <p>Location: {event.location}</p>
                            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                            <p>Price: ${event.price.toFixed(2)}</p>
                            <p>Organizer: {event.organizer}</p>
                        </div>
                    ))
                ) : (
                    <p>No events available</p>
                )}
            </div>
        </div>
    );
};

export default EventsPage;
