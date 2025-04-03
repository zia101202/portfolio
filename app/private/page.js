"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Upload from "../../components/ui/upload";
import DeleteProject from "../../components/ui/deleteProject";
import ExperienceForm from "../../components/ui/addExperience";
import AllExperience from "../../components/ui/GetExperience";
import SkillUpload from "../../components/ui/skillsUpload";
import GetAllSkills from "../../components/ui/getSkills";
import Personal from "../../components/ui/personal";
import Uploadpersonal from "../../components/ui/addPersonalData";
import {NavbarDemo} from "@/components/ui/navbar";
import { cn } from "@/lib/utils";
const components = [
  { name: "Upload Project", component: <Upload /> },

  { name: "Delete Project", component: <DeleteProject /> },
  { name: "View Experience", component: <AllExperience /> },
  { name: "Upload Skills", component: <SkillUpload /> },
  { name: "View Skills", component: <GetAllSkills /> },
  { name: "PersonalData", component: <Personal /> },
  { name: "Uploadpersonal", component: <Uploadpersonal /> },
];

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [Experience,setExperiences]= useState(false);
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
 

 
            
                <div
                  className="relative  min-h-screen w-full items-center justify-center bg-[#000319] bg-grid-white/[0.15] dark:bg-black">
                  <div
                    className={cn(
                      "absolute inset-0 z-10",
                      "[background-size:80px_80px]",
                      "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                      "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                    )}
                    style={{ opacity: 0.11 }} // Reduced opacity
                  />
                  {/* Radial gradient for the container to give a faded look */}
                  
                    <div className="relative z-20">
                    <NavbarDemo/>
    <div className="relative min-h-screen flex items-center justify-center  text-white">

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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-4xl p-6"
        >
          <div className="grid grid-cols-2 gap-4">
            {components.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedComponent(item)}
                className="cursor-pointer p-4 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 text-center text-lg font-semibold hover:bg-blue-700 transition-all"
              >
                {item.name}
              </motion.div>
            ))}

<motion.div
              
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setExperiences(true)}
                className="cursor-pointer p-4 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 text-center text-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Add Experience
              </motion.div>
          </div>

          <AnimatePresence>
            {selectedComponent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed inset-0 flex items-center justify-center  z-50  p-4"
              >
                <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700 w-full max-w-lg text-center">
                  <h2 className="text-xl font-semibold mb-4">{selectedComponent.name}</h2>
                  <div>{selectedComponent.component}</div>
                
                  <button
                    onClick={() => setSelectedComponent(null)}
                    className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"
                  >
                    Close ❌
                  </button>
                </div>
              </motion.div>
            )}

           
          </AnimatePresence>
        </motion.div>

      )}
       
    </div>
    {Experience &&(
                <ExperienceForm setExperiences={setExperiences} />
            ) }
                    </div>
                   
                </div>
            
    </>
  );
}