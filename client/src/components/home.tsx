import react from "react";
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const navigate = useNavigate();

    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
          <h2 className="text-center text-3xl font-semibold text-gray-800">Welcome!</h2>
          <p className="mt-2 text-center text-gray-600">Choose an option below to proceed:</p>
          <div className="mt-6 space-y-4">
            <button
              className="w-full py-3 px-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none"
              onClick={() => navigate('/login')}
            >
              Log In
            </button>
            <button
              className="w-full py-3 px-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none"
              onClick={() => navigate('/Signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  };