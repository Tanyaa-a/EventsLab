import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../../utils/DBRequests'; 
import mainImage from "../../assets/mainImage.jpg";
import { Link } from 'react-router-dom'; 

const EventsPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const eventsList = await fetchEvents(); 
                setEvents(eventsList); 
            } catch (error) {
                console.error('Error loading events:', error);
            }
        };

        loadEvents();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-4">Events Near You</h1>
            <Link to="/add-event">
                <button className="bg-orange-500 text-white px-4 py-2 rounded mb-4">
                    Add Your Event
                </button>
            </Link> 
            <div className="events grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event._id} className="event-card bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={mainImage}  className="w-full h-48 object-cover" />
                            <div className="p-4 flex flex-col">
                                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                                <p className="text-gray-700 mb-2">{event.description}</p>
                                <p className="text-gray-700 mb-2">Location: {event.location}</p>
                                <p className="text-gray-700 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
                                <p className="text-gray-700 mb-2">Price: ${event.price.toFixed(2)}</p>
                                <p className="text-gray-700">Organizer: {event.organizer}</p>
                            </div>
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
