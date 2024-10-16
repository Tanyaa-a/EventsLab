import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { login } from '../../utils/DBRequests';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormErrors({ ...formErrors, [e.target.name]: '', form: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setFormErrors({
                ...formErrors,
                email: !formData.email ? 'Email is required' : null,
                password: !formData.password ? 'Password is required' : null,
            });
            return;
        }

        try {
            const result = await login(formData); 
            if (result.status === 200) {
            
                sessionStorage.setItem('token', result.data.token);
                sessionStorage.setItem('user', JSON.stringify(result.data.user));

            
                const redirectTo = location.state?.from || '/';
                navigate(redirectTo);
            }
        } catch (error) {
            setFormErrors({ ...formErrors, form: error.message || 'Invalid email or password' });
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token'); // Check if user is logged in
        if (token) {
            navigate('/'); 
        }
    }, [navigate]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h2 className="font-alex font-semibold text-3xl md:text-5xl text-black">Log In</h2>
            <form onSubmit={handleSubmit} className="w-10/12 md:w-1/3 2xl:w-1/4 flex flex-col">
                <div className="w-full flex flex-col gap-2 mb-6">
                    <label htmlFor="email" className="text-black">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-2 border-grey rounded-md p-2"
                    />
                    {formErrors.email && <p className="text-red">{formErrors.email}</p>}
                </div>
                <div className="w-full flex flex-col gap-2 mb-6 relative">
                    <label htmlFor="password" className="text-black">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border-2 border-grey rounded-md p-2"
                    />
                    {formErrors.password && <p className="text-red">{formErrors.password}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-lightRed text-black uppercase font-semibold tracking-wide rounded-md p-2 hover:bg-red transition duration-300 ease-in mb-2"
                >
                    Login
                </button>
                <p className="text-black">
                    Don't have an account? <Link to="/register" className="underline">Sign up</Link>
                </p>
                {formErrors.form && <p className="text-red">{formErrors.form}</p>}
            </form>
        </div>
    );
};

export default Login;

