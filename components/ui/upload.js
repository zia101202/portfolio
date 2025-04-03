"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({ title: "", description: "", gitHubLink: "" });

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("❌ Please select an image");

    const data = new FormData();
    data.append("image", file);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("gitHubLink", formData.gitHubLink);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const result = await response.json();
    if (response.ok) {
      setImageUrl(result.url);
    } else {
      alert("❌ Upload failed: " + result.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  text-white">
      <div className="w-full max-w-md p-6 bg-[#1e1e1e] shadow-xl border border-gray-700 rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Upload project</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Select Image:</label>
            <input
              type="file"
              className="w-full p-2 bg-[#2a2a2a] border border-gray-600 rounded-lg cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Title:</label>
            <input
              type="text"
              className="w-full p-2 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Description:</label>
            <input
              type="text"
              className="w-full p-2 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">GitHub Link:</label>
            <input
              type="text"
              className="w-full p-2 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({ ...formData, gitHubLink: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white py-2 rounded-lg font-medium"
          >
            <UploadCloud size={18} className="mr-2" /> Upload
          </button>
        </form>
        {imageUrl && (
          <div className="mt-4 text-center">
            <img src={imageUrl} alt="Uploaded" className="w-32 h-32 mx-auto rounded-lg border border-gray-600" />
          </div>
        )}
      </div>
    </div>
  );
}
