import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "skills.json");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id, title } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Skill ID is required" });
    }

    let data = [];
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, "utf-8");
      data = JSON.parse(fileContent);
    }

    const skillIndex = data.findIndex((s) => s.id === parseInt(id));
    if (skillIndex === -1) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // Update the skill
    if (title !== undefined) data[skillIndex].title = title;

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.status(200).json({
      message: "Skill updated successfully",
      data: data[skillIndex],
    });
  } catch (error) {
    console.error("Error updating skill:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
