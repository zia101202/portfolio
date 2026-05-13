import { readData, writeData } from "@/lib/dataStore";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { id, title } = req.body;
    if (!id) return res.status(400).json({ message: "Skill ID is required" });

    const data = readData("skills.json", []);
    const idx = data.findIndex((s) => s.id === parseInt(id));
    if (idx === -1) return res.status(404).json({ message: "Skill not found" });

    if (title !== undefined) data[idx].title = title;

    writeData("skills.json", data);
    res.status(200).json({ message: "Skill updated successfully", data: data[idx] });
  } catch (error) {
    console.error("Error updating skill:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
