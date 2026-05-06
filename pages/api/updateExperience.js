import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "experience.json");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id, startDate, endDate, description } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Experience ID is required" });
    }

    let data = [];
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, "utf-8");
      data = JSON.parse(fileContent);
    }

    const expIndex = data.findIndex((e) => e.id === parseInt(id));
    if (expIndex === -1) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Update the experience
    if (startDate !== undefined) data[expIndex].startDate = startDate;
    if (endDate !== undefined) data[expIndex].endDate = endDate;
    if (description !== undefined) data[expIndex].description = description;

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.status(200).json({
      message: "Experience updated successfully",
      data: data[expIndex],
    });
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
