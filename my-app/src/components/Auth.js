import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';
import { useStore } from '../store';
import './Auth.css';

const Auth = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const setUserId = useStore((state) => state.setUserId);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await registerUser(name, password);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser(name, password);
      const id = res.data.user_id;
      setUserId(id);
      navigate(`/user/${id}`);
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
    <h2>Register / Login</h2>
    <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <button onClick={handleRegister}>Register</button>
    <button onClick={handleLogin}>Login</button>
  </div>
  );
};

export default Auth;
