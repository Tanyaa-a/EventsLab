import React, { useState, useEffect } from 'react';
import { addEvent } from '../../utils/DBRequests'; 
import { useNavigate } from 'react-router-dom';

const AddEventForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        price: '',
        organizer: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Check user authentication
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            setError('You must be logged in to create an event.');
            navigate('/login');  
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const user = JSON.parse(sessionStorage.getItem('user'));  
        const userIdAsString = user?._id?.toString();  
    
        if (!user || !userIdAsString) {
            setError('User must be logged in to create an event.');
            return;
        }
    
        const eventData = {
            ...formData,
            createdBy: userIdAsString 
        };
    
        try {
            await addEvent(eventData);
            navigate('/events-page');
        } catch (error) {
            console.error('Error adding event:', error.message);
            setError('An error occurred while adding the event.');
        }
    };

    return (
        <div className="add-event-form max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Add Your Event</h1>
            {error && <p className="text-red-500">{error}</p>} 
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <label className="block text-sm font-medium text-gray-700">Title:</label>
                <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                />
                <label className="block text-sm font-medium text-gray-700">Description:</label>
                <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                />
                <label className="block text-sm font-medium text-gray-700">Date:</label>
                <input 
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                />
                <label className="block text-sm font-medium text-gray-700">Location:</label>
                <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                />
                <label className="block text-sm font-medium text-gray-700">Price:</label>
                <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                />
                <label className="block text-sm font-medium text-gray-700">Organizer:</label>
                <input 
                    type="text" 
                    name="organizer" 
                    value={formData.organizer} 
                    onChange={handleChange} 
                    required 
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit Event</button>
            </form>
        </div>
    );
};

export default AddEventForm;
