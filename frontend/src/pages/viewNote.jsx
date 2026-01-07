import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, updateNote } from "../api/note.jsx";
import RichEditor from "../components/RichEditor.jsx";

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", content: "" });
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    async function fetchNote() {
      const data = await getNote(id);
      setForm({ title: data.note.title, content: data.note.content || "" });
      setLoading(false);
    }
    fetchNote();
  }, [id]);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  async function handleSave() {
    await updateNote(id, { title: form.title, content: form.content });
    navigate("/dashboard");
  }

  if (loading) return <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0F172A] text-white" ref={containerRef}>
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#334155]">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="bg-transparent text-white text-lg sm:text-xl font-semibold outline-none w-[180px] sm:w-[240px]"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                containerRef.current?.requestFullscreen();
              }
            }}
            className="h-9 px-4 rounded-md bg-[#1E293B] hover:bg-[#334155] transition"
          >
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="h-9 px-4 rounded-md bg-[#1E293B] hover:bg-[#334155] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="h-9 px-4 rounded-md bg-gradient-to-r from-[#6D2AA0] via-[#8E24AA] to-[#9C27B0] hover:opacity-90 transition"
          >
            Save
          </button>
        </div>
      </div>
      <div className="px-4 sm:px-6 py-4">
        <RichEditor value={form.content} onChange={(html) => setForm({ ...form, content: html })} theme="dark" />
      </div>
    </div>
  );
}

export default EditNote;
