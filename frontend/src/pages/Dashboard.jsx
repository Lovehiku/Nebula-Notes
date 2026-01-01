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
    <div className="container">
      <h2>Your Notes</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))
          ) : (
            <p>No notes found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
