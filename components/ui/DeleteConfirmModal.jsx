"use client";
import { motion } from "framer-motion";

export default function DeleteConfirmModal({ isOpen, itemName, onConfirm, onCancel, isLoading }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-red-500/30 w-96 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-2xl font-bold text-white mb-2">Delete Item?</h3>
        <p className="text-gray-400 mb-6">
          Are you sure you want to delete <span className="text-red-400 font-semibold">{itemName}</span>?
        </p>
        <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
