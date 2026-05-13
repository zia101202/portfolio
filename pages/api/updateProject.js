import { readData, writeData } from "@/lib/dataStore";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { id, title, description, gitHubLink } = req.body;
    if (!id) return res.status(400).json({ message: "Project ID is required" });

    const data = readData("data.json", []);
    const idx = data.findIndex((p) => p.id === parseInt(id));
    if (idx === -1) return res.status(404).json({ message: "Project not found" });

    if (title !== undefined) data[idx].title = title;
    if (description !== undefined) data[idx].description = description;
    if (gitHubLink !== undefined) data[idx].gitHubLink = gitHubLink;

    writeData("data.json", data);
    res.status(200).json({ message: "Project updated successfully", data: data[idx] });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
