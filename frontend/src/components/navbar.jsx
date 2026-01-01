import { Link } from 'react-router-dom';
import React from 'react';

function Navbar({ onLogout }) {
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex space-x-6">
            <Link 
              to="../Dashboard" 
              className="text-white font-semibold hover:text-gray-200 transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="../createNote" 
              className="text-white font-semibold hover:text-gray-200 transition-colors"
            >
              Create Notes
            </Link>
          </div>

          {/* Right side */}
          <div>
            <button 
              onClick={onLogout} 
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;