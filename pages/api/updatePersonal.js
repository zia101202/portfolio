import { readData, writeData } from "@/lib/dataStore";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { id, github, whatsapp, email, linkedin } = req.body;
    if (!id) return res.status(400).json({ message: "Personal data ID is required" });

    const data = readData("personal.json", []);
    const idx = data.findIndex((p) => p.id === parseInt(id));
    if (idx === -1) return res.status(404).json({ message: "Personal data not found" });

    if (github !== undefined) data[idx].github = github;
    if (whatsapp !== undefined) data[idx].whatsapp = whatsapp;
    if (email !== undefined) data[idx].email = email;
    if (linkedin !== undefined) data[idx].linkedin = linkedin;

    writeData("personal.json", data);
    res.status(200).json({ message: "Personal data updated successfully", data: data[idx] });
  } catch (error) {
    console.error("Error updating personal data:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
