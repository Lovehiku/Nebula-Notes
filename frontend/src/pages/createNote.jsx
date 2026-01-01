import { useState } from "react";
import { createNote } from "../api/note";
import { useNavigate } from "react-router-dom";
import React from 'react';

function CreateNote() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNote({ title, content });
    alert("Note created successfully!");
    setTitle("");
    setContent("");
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Create Note</h2>

        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title" 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Content" 
          required 
          rows="6"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />

        <button 
          type="submit" 
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
        >
          Create Note
        </button>
      </form>
    </div>
  );
}

export default CreateNote;