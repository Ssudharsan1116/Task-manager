import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import apiClient from '../api/apiClient';
import { User, Lock, Link2 } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [trilinkUid, settrilinkUid] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await apiClient.post('/auth/register', {
                username,
                password,
                trilinkUid
            });
            login({ username: response.data.username, uid: response.data.uid }, response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <AuthLayout
            title="Join Genesis"
            subtitle="Create your account and start building"
            footer={<span>Already have an account? <Link to="/login">Sign in</Link></span>}
        >
            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="reg-username">Username</label>
                    <div className="input-wrapper">
                        <User size={16} className="input-icon" />
                        <input
                            id="reg-username"
                            type="text"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="reg-password">Password</label>
                    <div className="input-wrapper">
                        <Lock size={16} className="input-icon" />
                        <input
                            id="reg-password"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="trilink-uid">trilink Code</label>
                    <div className="input-wrapper">
                        <Link2 size={16} className="input-icon" />
                        <input
                            id="trilink-uid"
                            type="text"
                            placeholder="Optional — enter referrer's UID"
                            value={trilinkUid}
                            onChange={(e) => settrilinkUid(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className="auth-btn" id="register-submit-btn">
                    Create Account
                </button>
            </form>
        </AuthLayout>
    );
};

export default Register;
