import { Link } from "react-router-dom";
import React from "react";

function NoteCard({ note }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{note.title}</h3>
      <p className="text-gray-600 mb-4">
        {note.content.length > 50 
          ? note.content.substring(0, 50) + "..." 
          : note.content}
      </p>
      <Link 
        to={`/notes/${note._id}`} 
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        View
      </Link>
    </div>
  );
}

export default NoteCard;