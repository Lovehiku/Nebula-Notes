import { useState, useEffect } from "react";
import { getNote, updateNote, deleteNote } from "../api/notes";
import { useParams, useNavigate } from "react-router-dom";
import React from 'react';
import RichEditor from "../components/RichEditor.jsx";

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Untitled");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      const noteData = await getNote(id);
      setTitle(noteData.title);
      setContent(noteData.content);
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("Cannot save an empty note!");
      return;
    }
    await updateNote(id, { title, content });
    alert("Note updated successfully!");
    navigate("/dashboard");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await deleteNote(id);
      alert("Note deleted successfully!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Header with Title and Buttons */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#334155]">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent text-white text-lg sm:text-xl font-semibold outline-none w-[180px] sm:w-[240px]"
          placeholder="Note Title"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="h-9 px-4 rounded-md bg-[#1E293B] hover:bg-[#334155] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="h-9 px-4 rounded-md bg-gradient-to-r from-[#6D2AA0] via-[#8E24AA] to-[#9C27B0] hover:opacity-90 transition"
          >
            Save
          </button>
          <button
            onClick={handleDelete}
            className="h-9 px-4 rounded-md bg-red-600 hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Rich Text Editor */}
      <div className="px-4 sm:px-6 py-4">
        <RichEditor
          value={content}
          onChange={setContent}
          theme="dark"
          placeholder="Start editing your note..."
        />
      </div>
    </div>
  );
}

export default EditNote;
