// RichEditor.jsx
import React, { useEffect, useRef, useState } from "react";

export default function RichEditor({ value, onChange, theme = "dark" }) {
  const editorRef = useRef(null);
  const [state, setState] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    block: "p",
    ul: false,
    ol: false,
    code: false,
  });

  const exec = (cmd, val = null) => {
    document.execCommand(cmd, false, val);
    updateState();
    if (onChange) onChange(editorRef.current.innerHTML);
  };

  const setBlock = (tag) => exec("formatBlock", tag);

  const toggleCode = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    let container = sel.getRangeAt(0).commonAncestorContainer;
    while (container && container.nodeType !== 1) container = container.parentNode;
    if (!container) return;

    if (container.tagName === "PRE") exec("formatBlock", "p");
    else exec("formatBlock", "pre");
  };

  const updateState = () => {
    const blockVal = document.queryCommandValue("formatBlock") || "p";
    setState({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      block: blockVal.toLowerCase(),
      ul: document.queryCommandState("insertUnorderedList"),
      ol: document.queryCommandState("insertOrderedList"),
      code: blockVal.toLowerCase() === "pre",
    });
  };

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    el.innerHTML = value || "";
    const handler = () => updateState();
    const inputHandler = () => onChange && onChange(el.innerHTML);
    el.addEventListener("keyup", handler);
    el.addEventListener("mouseup", handler);
    el.addEventListener("input", inputHandler);
    return () => {
      el.removeEventListener("keyup", handler);
      el.removeEventListener("mouseup", handler);
      el.removeEventListener("input", inputHandler);
    };
  }, [value, onChange]);

  const toolbarButtonClass = (active) =>
    `h-8 w-8 rounded flex items-center justify-center ${
      active ? (theme === "dark" ? "bg-[#1E293B]" : "bg-[#E6E8EC]") : ""
    } hover:bg-gray-500 transition-colors duration-150 ${theme === "dark" ? "text-white" : ""}`;

  return (
    <div className={`${theme === "dark" ? "border border-[#334155] bg-[#0F172A]" : "border border-[#E6E8EC] bg-white"} rounded-md`}>
      {/* Toolbar */}
      <div className={`flex items-center gap-2 px-2 py-1 ${theme === "dark" ? "border-b border-[#334155] text-white" : "border-b border-[#E6E8EC]"}`}>
        <select
          value={state.block}
          onChange={(e) => setBlock(e.target.value)}
          className={`h-8 rounded-md px-2 text-sm ${theme === "dark" ? "bg-[#0B1323] border border-[#334155] text-white" : "border border-[#E6E8EC]"}`}
        >
          <option value="p">Plain</option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
        </select>
        <button onClick={() => exec("bold")} className={toolbarButtonClass(state.bold)}>B</button>
        <button onClick={() => exec("italic")} className={toolbarButtonClass(state.italic)}>I</button>
        <button onClick={() => exec("underline")} className={toolbarButtonClass(state.underline)}>U</button>
        <button onClick={() => exec("strikeThrough")} className={toolbarButtonClass(state.strikeThrough)}>S</button>
        <button onClick={() => exec("insertUnorderedList")} className={toolbarButtonClass(state.ul)}>•</button>
        <button onClick={() => exec("insertOrderedList")} className={toolbarButtonClass(state.ol)}>1.</button>
        <button onClick={toggleCode} className={toolbarButtonClass(state.code)}>{`</>`}</button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        dir="RTL" // <-- normal left-to-right
      className={`min-h-32 p-3 outline-none max-w-none text-left ${theme === "dark" ? "bg-[#0F172A] text-white" : ""}`}
        style={{ whiteSpace: "pre-wrap" }}
         onBlur={() => onChange && onChange(editorRef.current.innerHTML)}
      />
    </div>
  );
}
