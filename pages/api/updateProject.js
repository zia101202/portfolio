import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "data.json");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id, title, description, gitHubLink } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    let data = [];
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, "utf-8");
      data = JSON.parse(fileContent);
    }

    const projectIndex = data.findIndex((p) => p.id === parseInt(id));
    if (projectIndex === -1) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update the project
    if (title !== undefined) data[projectIndex].title = title;
    if (description !== undefined) data[projectIndex].description = description;
    if (gitHubLink !== undefined) data[projectIndex].gitHubLink = gitHubLink;

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.status(200).json({
      message: "Project updated successfully",
      data: data[projectIndex],
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
