import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import apiClient from '../api/apiClient';
import { User, Lock } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await apiClient.post('/auth/login', { username, password });
            login({ username: response.data.username, uid: response.data.uid }, response.data.token);
            navigate('/dashboard');
        } catch (err) {
            const msg = err.response?.data?.message || (typeof err.response?.data === 'string' ? err.response.data : null) || 'Invalid username or password';
            setError(msg);
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to access your network"
            footer={<span>Don't have an account? <Link to="/register">Create one</Link></span>}
        >
            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <div className="input-wrapper">
                        <User size={16} className="input-icon" />
                        <input
                            id="username"
                            type="text"
                            placeholder=""
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-wrapper">
                        <Lock size={16} className="input-icon" />
                        <input
                            id="password"
                            type="password"
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="auth-btn" id="login-submit-btn">
                    Sign In
                </button>
            </form>
        </AuthLayout>
    );
};

export default Login;
