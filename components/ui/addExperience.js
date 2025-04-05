"use client";
import React, { useState, useRef, useEffect } from "react";
import TiptapEditor from "./editor";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import CodeBlock from "@tiptap/extension-code-block";
import TextStyle from "@tiptap/extension-text-style";
import FontSize from "@tiptap/extension-font-size";

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListBulletIcon,
  Bars3Icon,
  LinkIcon,
  PhotoIcon,
  CodeBracketIcon,
  TableCellsIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";
export default function ExperienceForm({setExperiences}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");

  const quillRef = useRef(null); // Reference for Quill editor

  useEffect(() => {
    if (quillRef.current) {
      console.log("Quill is initialized", quillRef.current);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (startDate > endDate) {
      setMessage("❌ Start date cannot be after end date.");
      setLoading(false);
      return;
    }

    const newExperience = { startDate, endDate, description: content };

    try {
      const response = await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExperience),
      });

      if (response.ok) {
        setMessage("✅ Experience added successfully!");
        setStartDate("");
        setEndDate("");
        setExperience("");
        setContent(""); // Reset Quill editor
      } else {
        setMessage("❌ Failed to add experience.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Error sending data to the backend.");
    } finally {
      setLoading(false);
    }
  };
 


   
  
   const editor = useEditor({
     extensions: [
       StarterKit,
       Bold,
       Italic,
       Underline,
       Heading.configure({ levels: [1, 2, 3] }),
       BulletList,
       OrderedList,
       ListItem,
       Image,
       TextStyle,
       FontSize.configure({ types: ["textStyle"] }),
       Link.configure({ openOnClick: true }),
       Table.configure({ resizable: true }),
       TableRow,
       TableCell,
       TableHeader,
       CodeBlock,
     ],
     editorProps: {
       attributes: {
         class: "h-[300px] w-full overflow-auto focus:outline-none", // Set height here
       },
     },
     content: "<p>Hello World!</p>",
     onUpdate: ({ editor }) => {
       setContent(editor.getHTML());
     },
   });
 
   if (!editor) {
     return <p className="text-gray-400">Loading Editor...</p>;
   }
 
   const fontSizes = [
     "12px",
     "14px",
     "16px",
     "18px",
     "20px",
     "24px",
     "28px",
     "32px",
     "36px",
     "40px",
   ];
 
   const setFontSize = (size) => {
     editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
   };








console.log(content);


  return (
    <>
    
    

    <div className="bg-gray-900 fixed inset-0 sm:my-[20px] my-[10px]  text-white sm:p-5 p-[5px] rounded-xl border border-gray-600 shadow-lg max-w-3xl mx-auto">
          {/* Toolbar */}
          <div className="flex gap-2 p-3 bg-gray-800 rounded-lg mb-4">
            <select
              onChange={(e) => setFontSize(e.target.value)}
              className="p-2 mx-1 bg-gray-700 text-white rounded-lg"
            >
              {fontSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              <BoldIcon className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              <ItalicIcon className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              <UnderlineIcon className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              <ListBulletIcon className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              <Bars3Icon className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              <HashtagIcon className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()
              }
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              <TableCellsIcon className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              <CodeBracketIcon className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => {
                const url = prompt("Enter Image URL");
                if (url) editor.chain().focus().setImage({ src: url }).run();
              }}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              <PhotoIcon className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => {
                const url = prompt("Enter Link URL");
                if (url) editor.chain().focus().setLink({ href: url }).run();
              }}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              <LinkIcon className="w-5 h-5 text-white" />
            </button>
          </div>
    
          {/* Editor */}
          <div className="border border-gray-700 p-4 rounded-lg bg-gray-800">
            <EditorContent editor={editor} />
          </div>

          
    <div className=" flex  mt-[10px]  text-white ">
  

  

  <form onSubmit={handleSubmit} className="space-y-4 min-w-full sm:px-[40px] px-[10px]">
  {message && <p className="text-center mb-4 text-sm font-medium text-gray-300">{message}</p>}
    <div>
      <label className="block text-sm font-medium text-gray-300">Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
        className="w-full p-3 bg-[#1e1e1e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-300">End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
        className="w-full p-3 bg-[#1e1e1e] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
   


<div className="flex space-x-2.5">

    <button
    
      onClick={()=> setExperiences(false)}
      className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white py-2.5 rounded-lg font-medium"
    >
      cancel
    </button>


   


    <button
      type="submit"
      disabled={loading}
      className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white py-2.5 rounded-lg font-medium"
    >
      {loading ? "Submitting..." : "Submit Experience"}
    </button>
    </div>
  </form>
  
</div>
        </div>
        </>
  );
}
