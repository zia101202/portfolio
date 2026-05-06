"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DataDashboard from "@/components/ui/DataDashboard";
import {NavbarDemo} from "@/components/ui/navbar";
import { SpotlightPreview } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const correctPassword = "20Kilometer*#";

  useEffect(() => {
    const storedAuth = localStorage.getItem("authenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPassword === correctPassword) {
      localStorage.setItem("authenticated", "true");
      setIsAuthenticated(true);
    } else {
      alert("❌ Incorrect password! Try again.");
    }
  };

  return (
    <>
      <SpotlightPreview />
      <div className="relative min-h-screen w-full items-center justify-center bg-[#000319] bg-grid-white/[0.15] dark:bg-black">
        <div
          className={cn(
            "absolute inset-0 z-10",
            "[background-size:80px_80px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
          style={{ opacity: 0.11 }}
        />
        <div className="relative z-20">
          <NavbarDemo />
          <div className="relative min-h-screen flex items-center justify-center text-white">
            {!isAuthenticated ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
              >
                <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700 w-80 text-center">
                  <h2 className="text-xl font-semibold mb-4 text-gray-300">🔒 Enter Password</h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="password"
                      className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter password..."
                      value={inputPassword}
                      onChange={(e) => setInputPassword(e.target.value)}
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 transition-all py-2 rounded-lg text-white font-semibold"
                    >
                      Unlock 🔓
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <DataDashboard />
            )}
          </div>
        </div>
      </div>
    </>
  );
}