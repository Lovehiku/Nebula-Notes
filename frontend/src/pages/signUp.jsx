import React from 'react'
import { useState } from "react";
import { signup } from "../api/auth.jsx";

function SignUp() {
    const [email, setEmail] = useState(""); 
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
         e.preventDefault(); 
         const res = await signup({ email, username, password });
         alert("Signup successful, please login!"); };
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignUp