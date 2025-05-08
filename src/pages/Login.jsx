import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';

const branches = ['Harlow','Bishop']; // Example branches

const Login = () => {
  const [selectedBranch, setSelectedBranch] = useState('');
  const [showBranchPopup, setShowBranchPopup] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_HOST}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Branch': selectedBranch, // Send branch in header
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        navigate({ to: '/product' });
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Server error, please try again later');
    }
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    localStorage.setItem('selectedBranch', branch); 
    setShowBranchPopup(false); // Hide popup once branch selected
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-white">
      {showBranchPopup ? (
        <div className="w-10/12 h-fit max-lg:w-11/12 max-lg:px-8 p-10 bg-white shadow-xl rounded-xl flex flex-col gap-6">
          <h1 className="font-semibold text-xl text-center">Select Your Branch</h1>
          <div className="grid grid-cols-2 gap-4">
            {branches.map((branch) => (
              <button
                key={branch}
                onClick={() => handleBranchSelect(branch)}
                className="h-92 max-lg:h-30 hover:shadow-md w-full bg-cover cursor-pointer bg-no-repeat bg-center  font-semibold text-white text-sm rounded-lg "
               style={{backgroundImage:`url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`}}
              >
                <div className='w-full flex items-center max-lg:text-xl text-white justify-center text-3xl h-full rounded-lg bg-black/40'>
                  {branch}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-3/12 h-fit max-lg:w-11/12 max-lg:px-8 p-10 bg-white shadow-xl rounded-xl">
          <h1 className="font-semibold text-xl">Login ({selectedBranch})</h1>
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
      )}
    </div>
  );
};

export default Login;
