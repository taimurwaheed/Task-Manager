import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { userService } = useAppContext();
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const user = await userService.findUserByEmail(email);
            if (user && user.password === password) {
                login(user);
                navigate('/home');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to Your Account</h2>
                <form onSubmit={handleLogin} className="space-y-5">
                    {error && (
                        <p className="text-red-600 text-sm text-center">{error}</p>
                    )}
                    <div>
                        <label className="block text-gray-600 mb-1" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    <span className="text-gray-600">Don't have an account?</span>
                    <button
                        onClick={() => navigate('/signup')}
                        className="ml-1 text-green-600 hover:underline"
                    >
                        Signup
                    </button>
                </div>
            </div>
        </div>
    );
};
