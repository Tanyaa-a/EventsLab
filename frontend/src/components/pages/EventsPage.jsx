import React, { useEffect, useState } from 'react';
import { fetchEvents, deleteEvent } from '../../utils/DBRequests';
import { Link } from 'react-router-dom';
import mainImage from "../../assets/mainImage.jpg";

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState(null);

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

    useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
        setUser(loggedInUser);
    }, []);

    const handleDelete = async (eventId) => {
        try {
            await deleteEvent(eventId);
            setEvents(events.filter(event => event._id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 pb-12">
            <h1 className="text-3xl font-bold my-4">Events Near You</h1>

            {user ? (
                <Link to="/add-event">
                    <button className="bg-orange-500 text-white px-4 py-2 rounded mb-4">
                        Add Your Event
                    </button>
                </Link>
            ) : (
                <p className="text-red-500">You must be logged in to add an event.</p>
            )}

            <div className="events grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event._id} className="event-card bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={mainImage} className="w-full h-48 object-cover" alt="Event" />
                            <div className="p-4 flex flex-col">
                                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                                <p className="text-gray-700 mb-2">{event.description}</p>
                                <p className="text-gray-700 mb-2">Location: {event.location}</p>
                                <p className="text-gray-700 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
                                <p className="text-gray-700 mb-2">Price: ${event.price.toFixed(2)}</p>
                                <p className="text-gray-700">Organizer: {event.organizer}</p>
                                <div className="flex space-x-4 mt-4">
                                    <Link to={`/edit/${event._id}`}>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(event._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No events found. Please login to view events.</p>
                )}
            </div>
        </div>
    );
};

export default EventsPage;
