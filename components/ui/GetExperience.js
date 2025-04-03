"use client";
import { useEffect, useState } from "react";

export default function AllExprience() {
  const [uploads, setUploads] = useState(null);
  const [Data, setData] = useState("");
  const [Value, setValue] = useState("");

  useEffect(() => {
    fetch("/api/experience", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setUploads(data.experiences));
  }, []);

  useEffect(() => {
    if (uploads) {
      setData(JSON.stringify(uploads , null, 2));
    }
  }, [uploads]);

  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(Value);
  };

  const handleDelete = () => {
    console.log();
    fetch("/api/deleteExperience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id:Value} ),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Project deleted successfully:", data);
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
  };
console.log(uploads);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Experience</h1>
        
        <pre className="bg-gray-700 p-4 rounded-lg text-sm overflow-x-auto max-h-64">
          {Data || "Loading projects..."}
        </pre>

        <div className="mt-4">
          <label className="block text-gray-300 text-sm mb-2">
            Enter Project ID:
          </label>
          <input
            type="text"
            className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            placeholder="Project ID..."
          />
        </div>

        <button
          onClick={handleDelete}
          className="w-full mt-4 p-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all duration-300"
        >
          Delete Project 🚀
        </button>
      </div>
    </div>
  );
}
