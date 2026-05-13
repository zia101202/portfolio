import { readData, writeData } from "@/lib/dataStore";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const { id } = req.body;
    let jsonData = readData("skills.json", []);
    jsonData = jsonData.filter((v) => v.id !== Number(id));
    writeData("skills.json", jsonData);
    return res.status(200).json({ message: "✅ Skill deleted!", data: jsonData });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
