import { useState } from "react"; 
import { createNote } from "../api/note";

import React from 'react'

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNote({ title, content });
    alert("Note created successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
        <h2>Create  Note</h2>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
      <button type="submit">Create Note</button>
    </form>
  )
}

export default CreateNote