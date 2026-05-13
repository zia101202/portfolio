import { readData, writeData } from "@/lib/dataStore";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { id, startDate, endDate, description } = req.body;
    if (!id) return res.status(400).json({ message: "Experience ID is required" });

    const data = readData("experience.json", []);
    const idx = data.findIndex((e) => e.id === parseInt(id));
    if (idx === -1) return res.status(404).json({ message: "Experience not found" });

    if (startDate !== undefined) data[idx].startDate = startDate;
    if (endDate !== undefined) data[idx].endDate = endDate;
    if (description !== undefined) data[idx].description = description;

    writeData("experience.json", data);
    res.status(200).json({ message: "Experience updated successfully", data: data[idx] });
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
