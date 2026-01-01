import { useState, useEffect } from "react";
import { getNote, updateNote, deleteNote } from "../api/notes";
import { useParams, useNavigate } from "react-router-dom";
import React from 'react';

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchNote = async () => {
      const note = await getNote(id);
      setNote(note);
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateNote(id, { id, note });
    alert("Note updated successfully!");
    navigate("/dashboard");
  };

  const handleDelete = async () => {
    await deleteNote(id);
    alert("Note deleted successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleUpdate} 
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Edit Note</h2>

        <input
          type="text"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          placeholder="Title"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <textarea
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          placeholder="Content"
          required
          rows="6"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />

        <div className="flex gap-4">
          <button 
            type="submit" 
            className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
          >
            Update
          </button>
          <button 
            type="button" 
            onClick={handleDelete} 
            className="flex-1 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditNote;