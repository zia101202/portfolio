"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function UploadPersonal() {
  const [formData, setFormData] = useState({
    github: "",
    whatsapp: "",
    email: "",
    linkedin: "",
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    const { github, whatsapp, email, linkedin } = formData; // ✅ Fix: Destructure correctly

    try {
      const response = await fetch("/api/personal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ Fix: Specify JSON format
        },
        body: JSON.stringify({ github, whatsapp, email, linkedin }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong"); // ✅ Fix: Proper error handling
      }

      alert("✅ Upload successful!"); // ✅ Fix: User feedback
    } catch (error) {
      alert(`❌ Upload failed: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <div className="w-full max-w-md p-6 bg-[#1e1e1e] shadow-xl border border-gray-700 rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Upload Personal</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          {["github", "whatsapp", "email", "linkedin"].map((field) => (
            <div key={field} className="space-y-2">
              <label className="text-sm capitalize">{field}:</label>
              <input
                type={field === "email" ? "email" : "text"}
                className="w-full p-2 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white py-2 rounded-lg font-medium"
          >
            <UploadCloud size={18} className="mr-2" /> Upload
          </button>
        </form>
      </div>
    </div>
  );
}
