import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, deleteNote, updateNote } from "../api/note.jsx";

function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    async function fetchNote() {
      const data = await getNote(id);
      setNote(data.note);
      setForm({ title: data.note.title, content: data.note.content });
    }
    fetchNote();
  }, [id]);

  async function handleDelete() {
    await deleteNote(id);
    navigate("/dashboard");
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const data = await updateNote(id, form);
    setNote(data.note);
    setEditing(false);
    navigate("/dashboard");
  }

  if (!note) return <p className="text-gray-500 text-center mt-10">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg space-y-4">
        {editing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Content"
              required
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Save
            </button>
          </form>
        ) : (
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">{note.title}</h2>
            <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
          </div>
        )}

        <div className="flex gap-4">
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="flex-1 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors font-semibold"
            >
              Edit
            </button>
          )}
          <button
            onClick={handleDelete}
            className="flex-1 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteDetails;