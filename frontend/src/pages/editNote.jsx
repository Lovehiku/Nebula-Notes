import { useState, useEffect } from "react";
import { getNote, updateNote, deleteNote } from "../api/notes";
import { useParams } from "react-router-dom";

import React from 'react'

function EditNote(){
  const { id } = useParams();
  const [note, setNote] = useState({title:"",content:""});

  useEffect(() => {
    const fetchNote = async () => {
      const note = await getNote(id);
      setNote(note);
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateNote(id, { id, note });
    alert("Note updated successfully!");
  };

  const handleDelete = async () => {
    await deleteNote(id);
    alert("Note deleted successfully!");
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <input value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} />
      <textarea value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  ) 
}

export default E