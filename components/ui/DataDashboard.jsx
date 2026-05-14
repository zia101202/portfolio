"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditModal from "./EditModal";
import Upload from "./upload";
import SkillUpload from "./skillsUpload";
import ExperienceForm from "./addExperience";
import Uploadpersonal from "./addPersonalData";

const tabs = ["Hero", "Projects", "Experience", "Skills", "Personal"];

export default function DataDashboard() {
  const [activeTab, setActiveTab] = useState("Projects");
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null, type: null });
  const [editModal, setEditModal] = useState({ isOpen: false, item: null, type: null });
  const [showUpload, setShowUpload] = useState({ type: null, isOpen: false });
  const [editExperienceModal, setEditExperienceModal] = useState({ isOpen: false, item: null });
  const [processingDelete, setProcessingDelete] = useState(false);
  const [processingSave, setProcessingSave] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const timestamp = new Date().getTime();
      const [projectsRes, experienceRes, skillsRes, personalRes, heroRes] = await Promise.all([
        fetch(`/api/upload?t=${timestamp}`, { cache: "no-store" }),
        fetch(`/api/experience?t=${timestamp}`, { cache: "no-store" }),
        fetch(`/api/skills?t=${timestamp}`, { cache: "no-store" }),
        fetch(`/api/personal?t=${timestamp}`, { cache: "no-store" }),
        fetch(`/api/hero?t=${timestamp}`, { cache: "no-store" }),
      ]);

      if (projectsRes.ok) {
        const data = await projectsRes.json();
        setProjects(data.jsonData || []);
      }
      if (experienceRes.ok) {
        const data = await experienceRes.json();
        setExperiences(data.experiences || []);
      }
      if (skillsRes.ok) {
        const data = await skillsRes.json();
        setSkills(data.jsonData || []);
      }
      if (personalRes.ok) {
        const data = await personalRes.json();
        setPersonal(data.experiences || []);
      }
      if (heroRes.ok) {
        const data = await heroRes.json();
        setHeroData(data || null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item, type) => {
    setDeleteModal({ isOpen: true, item, type });
  };

  const confirmDelete = async () => {
    const { item, type } = deleteModal;
    if (!item) return;

    try {
      setProcessingDelete(true);
      const endpoints = {
        project: "/api/deleteProject",
        experience: "/api/deleteExperience",
        skill: "/api/deleteSkills",
        personal: "/api/personalDelete",
      };

      const response = await fetch(endpoints[type], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id }),
      });

      if (response.ok) {
        await fetchAllData();
        setDeleteModal({ isOpen: false, item: null, type: null });
      } else {
        alert("Failed to delete item");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting item");
    } finally {
      setProcessingDelete(false);
    }
  };

  const handleEdit = (item, type) => {
    setEditModal({ isOpen: true, item: { ...item }, type });
  };

  const saveEdit = async (updatedData) => {
    const { type, item } = editModal;

    try {
      setProcessingSave(true);
      const endpoints = {
        project: "/api/updateProject",
        experience: "/api/updateExperience",
        skill: "/api/updateSkill",
        personal: "/api/updatePersonal",
      };

      const response = await fetch(endpoints[type], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, ...updatedData }),
      });

      if (response.ok) {
        alert("✅ Changes saved successfully!");
        await fetchAllData();
        setEditModal({ isOpen: false, item: null, type: null });
      } else {
        alert("Failed to save changes");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving changes");
    } finally {
      setProcessingSave(false);
    }
  };

  const ProjectsView = () => (
    <div className="space-y-4">
      <button
        onClick={() => setShowUpload({ type: "project", isOpen: true })}
        className="mb-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
      >
        ➕ Add New Project
      </button>
      {projects.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No projects yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all"
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                {project.gitHubLink && (
                  <a
                    href={project.gitHubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm mb-1 block"
                  >
                    🔗 GitHub Link
                  </a>
                )}
                {project.websiteUrl && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm mb-3 block"
                  >
                    🌐 Live Website
                  </a>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project, "project")}
                    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded transition-all"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project, "project")}
                    className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded transition-all"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const ExperienceView = () => (
    <div className="space-y-4">
      <button
        onClick={() => setShowUpload({ type: "experience", isOpen: true })}
        className="mb-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
      >
        ➕ Add Experience
      </button>
      {experiences.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No experience yet</p>
      ) : (
        <div className="space-y-3">
          {[...experiences].sort((a, b) => new Date(b.startDate || 0) - new Date(a.startDate || 0)).map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-gray-400 text-sm font-semibold">
                    📅 {exp.startDate} → {exp.endDate}
                  </p>
                </div>
              </div>
              <div
                className="text-gray-300 mb-3 text-sm prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: exp.description }}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setEditExperienceModal({ isOpen: true, item: exp })}
                  className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded transition-all"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(exp, "experience")}
                  className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded transition-all"
                >
                  🗑️ Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const SkillsView = () => (
    <div className="space-y-4">
      <button
        onClick={() => setShowUpload({ type: "skill", isOpen: true })}
        className="mb-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
      >
        ➕ Add Skill
      </button>
      {skills.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No skills yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-blue-500 transition-all text-center group"
            >
              {skill.imageUrl && (
                <img
                  src={skill.imageUrl}
                  alt={skill.title}
                  className="w-12 h-12 mx-auto mb-2 object-contain"
                />
              )}
              <p className="text-white text-sm font-semibold mb-2 line-clamp-1">{skill.title}</p>
              <div className="opacity-0 group-hover:opacity-100 transition-all flex gap-1">
                <button
                  onClick={() => handleEdit(skill, "skill")}
                  className="flex-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition-all"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(skill, "skill")}
                  className="flex-1 px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded transition-all"
                >
                  🗑️
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const PersonalView = () => (
    <div className="space-y-4">
      {personal.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">No personal data yet</p>
          <button
            onClick={() => setShowUpload({ type: "personal", isOpen: true })}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
          >
            ➕ Add Personal Info
          </button>
        </div>
      ) : (
        personal.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all"
          >
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm">GitHub</p>
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 break-all"
                >
                  {item.github || "Not set"}
                </a>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <a
                  href={`mailto:${item.email}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {item.email || "Not set"}
                </a>
              </div>
              <div>
                <p className="text-gray-400 text-sm">LinkedIn</p>
                <a
                  href={item.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 break-all"
                >
                  {item.linkedin || "Not set"}
                </a>
              </div>
              <div>
                <p className="text-gray-400 text-sm">WhatsApp</p>
                <p className="text-gray-200">{item.whatsapp || "Not set"}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item, "personal")}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-all"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(item, "personal")}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-all"
              >
                🗑️ Delete
              </button>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  const HeroView = () => {
    const [title, setTitle] = useState(heroData?.title || "");
    const [typedTextStr, setTypedTextStr] = useState(heroData?.typedText?.join("\n") || "");
    const [titleSize, setTitleSize] = useState(heroData?.titleSize || 40);
    const [typedTextSize, setTypedTextSize] = useState(heroData?.typedTextSize || 50);
    const [saving, setSaving] = useState(false);

    const saveHero = async () => {
      try {
        setSaving(true);
        const typedText = typedTextStr.split("\n").filter(line => line.trim() !== "");
        const res = await fetch("/api/hero", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            title, 
            typedText, 
            titleSize: Number(titleSize), 
            typedTextSize: Number(typedTextSize) 
          })
        });
        if(res.ok) {
          alert("Hero updated successfully!");
          fetchAllData();
        } else {
          alert("Failed to update hero");
        }
      } catch (err) {
        console.error("Save error:", err);
        alert("Error saving hero");
      } finally {
        setSaving(false);
      }
    };

    return (
      <div className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-400 mb-2">Main Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Title Font Size (px)</label>
            <input 
              type="number" 
              value={titleSize} 
              onChange={(e) => setTitleSize(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-400 mb-2">Animated Text (One sentence per line)</label>
            <textarea 
              rows="5"
              value={typedTextStr} 
              onChange={(e) => setTypedTextStr(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Animated Text Font Size (px)</label>
            <input 
              type="number" 
              value={typedTextSize} 
              onChange={(e) => setTypedTextSize(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button 
          onClick={saveHero} 
          disabled={saving}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
        >
          {saving ? "Saving..." : "💾 Save Changes"}
        </button>
      </div>
    );
  };

  const getViewComponent = () => {
    switch (activeTab) {
      case "Hero":
        return <HeroView />;
      case "Projects":
        return <ProjectsView />;
      case "Experience":
        return <ExperienceView />;
      case "Skills":
        return <SkillsView />;
      case "Personal":
        return <PersonalView />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-400">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto p-6"
    >
      <h1 className="text-4xl font-bold text-white mb-8">📊 Data Management</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-gray-800/30 rounded-lg p-6 border border-gray-700"
        >
          {getViewComponent()}
        </motion.div>
      </AnimatePresence>

      {/* Modals */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        itemName={
          deleteModal.item?.title ||
          deleteModal.item?.name ||
          `${deleteModal.type} #${deleteModal.item?.id}`
        }
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, item: null, type: null })}
        isLoading={processingDelete}
      />

      <EditModal
        isOpen={editModal.isOpen}
        itemType={editModal.type}
        itemData={editModal.item}
        onSave={saveEdit}
        onCancel={() => setEditModal({ isOpen: false, item: null, type: null })}
        isLoading={processingSave}
      />

      {/* Experience Edit Modal with Rich Editor */}
      <AnimatePresence>
        {editExperienceModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setEditExperienceModal({ isOpen: false, item: null });
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExperienceForm
                editMode={true}
                experienceData={editExperienceModal.item}
                onSuccess={() => {
                  fetchAllData();
                  setEditExperienceModal({ isOpen: false, item: null });
                }}
                onCancel={() => setEditExperienceModal({ isOpen: false, item: null })}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modals */}
      <AnimatePresence>
        {showUpload.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowUpload({ type: null, isOpen: false });
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowUpload({ type: null, isOpen: false })}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
              {showUpload.type === "project" && <Upload onSuccess={() => { fetchAllData(); setShowUpload({ type: null, isOpen: false }); }} />}
              {showUpload.type === "experience" && <ExperienceForm setExperiences={() => { fetchAllData(); setShowUpload({ type: null, isOpen: false }); }} />}
              {showUpload.type === "skill" && <SkillUpload onSuccess={() => { fetchAllData(); setShowUpload({ type: null, isOpen: false }); }} />}
              {showUpload.type === "personal" && <Uploadpersonal onSuccess={() => { fetchAllData(); setShowUpload({ type: null, isOpen: false }); }} />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
