import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "personal.json");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id, github, whatsapp, email, linkedin } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Personal data ID is required" });
    }

    let data = [];
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, "utf-8");
      data = JSON.parse(fileContent);
    }

    const personalIndex = data.findIndex((p) => p.id === parseInt(id));
    if (personalIndex === -1) {
      return res.status(404).json({ message: "Personal data not found" });
    }

    // Update the personal data
    if (github !== undefined) data[personalIndex].github = github;
    if (whatsapp !== undefined) data[personalIndex].whatsapp = whatsapp;
    if (email !== undefined) data[personalIndex].email = email;
    if (linkedin !== undefined) data[personalIndex].linkedin = linkedin;

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.status(200).json({
      message: "Personal data updated successfully",
      data: data[personalIndex],
    });
  } catch (error) {
    console.error("Error updating personal data:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
