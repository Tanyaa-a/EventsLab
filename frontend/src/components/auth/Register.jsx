import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../utils/DBRequests'

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { firstName, lastName, email, password, confirmPassword } = formData;
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            setSuccessMessage('Registration successful! Redirecting to login page...');
          
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'bg-white p-6 rounded-lg shadow-lg';
            modalContent.innerText = 'Registration successful! Redirecting to login page...';

            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            setTimeout(() => {
                document.body.removeChild(modal);
                navigate('/login');
            }, 2000);
            try {
                await register({ firstName, lastName, email, password });
                console.log('registration succeful')
                setSuccessMessage('Registration successful! Redirecting to login page...');
                setTimeout(() => {
                    navigate('/login'); 
                }, 2000);
            } catch (error) {
                setError(error.message);
                console.log('Registration failed', error);
            }
        }
    };

    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-700">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={onChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-700">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={onChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;