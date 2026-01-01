import React, { useEffect, useState } from "react";
import { getNotes } from "../api/note"; // ✅ FIXED PATH
import NoteCard from "../components/NoteCard";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data); // backend returns array
      } catch (err) {
        console.error("Failed to fetch notes", err);
        setError("Failed to load notes");
      } finally {
        setLoading(false); // ✅ VERY IMPORTANT
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Notes</h2>

        {loading && (
          <p className="text-gray-500 animate-pulse">Loading...</p>
        )}

        {error && (
          <p className="text-red-600 font-medium">{error}</p>
        )}

        {!loading && !error && (
          <>
            {notes.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {notes.map((note) => (
                  <NoteCard key={note._id} note={note} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No notes found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;