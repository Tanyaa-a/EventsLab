import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editEvent, fetchEvents } from '../../utils/DBRequests';

const EditEventPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        date: '',
        price: '',
        organizer: ''
    });
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const events = await fetchEvents(); 
                const eventToEdit = events.find(event => event._id === id);
                if (eventToEdit) {
                    setFormData({
                        title: eventToEdit.title,
                        description: eventToEdit.description,
                        location: eventToEdit.location,
                        date: new Date(eventToEdit.date).toISOString().split('T')[0], // Ensure proper date format
                        price: eventToEdit.price,
                        organizer: eventToEdit.organizer
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event:', error);
                setLoading(false);
            }
        };
        loadEvent();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editEvent(id, formData);
            navigate('/events-page');
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-4">Edit Event</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Organizer</label>
                    <input
                        type="text"
                        name="organizer"
                        value={formData.organizer}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEventPage;
