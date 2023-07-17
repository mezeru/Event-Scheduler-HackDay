import React from "react"
import { useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import sjcl from "sjcl"

export const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const myBitArray = sjcl.hash.sha256.hash(pass);
    const myHash = sjcl.codec.hex.fromBits(myBitArray);
    
    const resp = await axios.post("http://localhost:5000/login", {
      "Email": email,
      "Password": myHash
    });

    if( resp.status == 200){
      localStorage.setItem('token', resp.data.token);
      navigate('/');
    }
    }

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
            <h2 className="text-center text-3xl font-semibold text-gray-800">Login</h2>
            <form onSubmit={handleSubmit} className="mt-8">
              <div>
                <label htmlFor="email" className="block text-gray-700">Email Address</label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:bg-white focus:outline-none"
                  placeholder="Enter your password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
);
};
