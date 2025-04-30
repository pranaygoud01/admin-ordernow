import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation after successful login

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error message
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_HOST}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the backend sends a token
        localStorage.setItem('authToken', data.token); // Save token to localStorage
        navigate({to:'/orders'}); // Redirect to orders page after successful login
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Server error, please try again later');
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-3/12 h-fit max-lg:w-11/12 max-lg:px-8 p-10 bg-white shadow-xl rounded-xl">
        <h1 className="font-semibold text-xl">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-1 mt-8">
            <label className="text-xs text-neutral-500">Email</label>
            <input
              type="text"
              className="px-2 py-2 text-sm rounded-md border border-neutral-300"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-neutral-500">Password</label>
            <input
              type="password"
              className="px-2 py-2 text-sm rounded-md border border-neutral-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="font-semibold text-center text-white text-sm bg-black py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
