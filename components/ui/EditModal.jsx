"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function EditModal({ isOpen, itemType, itemData, onSave, onCancel, isLoading }) {
  const [formData, setFormData] = useState(itemData || {});

  // Update form data when itemData changes
  useEffect(() => {
    if (itemData) {
      setFormData({ ...itemData });
    }
  }, [itemData, isOpen]);

  if (!isOpen) return null;

  const getFieldsForType = () => {
    switch (itemType) {
      case "project":
        return [
          { name: "title", label: "Project Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "gitHubLink", label: "GitHub Link", type: "url" },
        ];
      case "experience":
        return [
          { name: "startDate", label: "Start Date", type: "text", placeholder: "YYYY/MM/DD" },
          { name: "endDate", label: "End Date", type: "text", placeholder: "YYYY/MM/DD" },
          { name: "description", label: "Description", type: "textarea" },
        ];
      case "skill":
        return [
          { name: "title", label: "Skill Name", type: "text" },
        ];
      case "personal":
        return [
          { name: "github", label: "GitHub URL", type: "url" },
          { name: "whatsapp", label: "WhatsApp", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "linkedin", label: "LinkedIn URL", type: "url" },
        ];
      default:
        return [];
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-50 backdrop-blur-sm p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-white mb-6">Edit {itemType}</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {getFieldsForType().map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  rows="4"
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              )}
            </div>
          ))}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
