import React from 'react'
import { useState } from "react";
import { signup } from "../api/auth.jsx";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); 
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const res = await signup({ email, username, password });
    alert("Signup successful!");
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>

        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button 
          type="submit" 
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp