import { useState } from "react";
import { createNote } from "../api/note";
import { useNavigate } from "react-router-dom";
import React from 'react';
import RichEditor from "../components/RichEditor.jsx";

function CreateNote() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Untitled");
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
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#334155]">
        <div className="flex items-center gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-white text-lg sm:text-xl font-semibold outline-none w-[180px] sm:w-[240px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="h-9 px-4 rounded-md bg-[#1E293B] hover:bg-[#334155] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="h-9 px-4 rounded-md bg-gradient-to-r from-[#6D2AA0] via-[#8E24AA] to-[#9C27B0] hover:opacity-90 transition"
          >
            Save
          </button>
        </div>
      </div>
      <div className="px-4 sm:px-6 py-4">
        <RichEditor value={content} onChange={setContent} theme="dark" />
      </div>
    </div>
  );
}

export default CreateNote;
