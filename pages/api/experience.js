import { readData, writeData } from "@/lib/dataStore";

export default function handler(req, res) {
  try {
    const jsonData = readData("experience.json", []);

    if (req.method === "POST") {
      const { startDate, endDate, description } = req.body;
      if (!startDate || !endDate || !description) {
        return res.status(400).json({ error: "All fields are required." });
      }
      const newEntry = {
        id: jsonData.length > 0 ? Math.max(...jsonData.map((e) => e.id)) + 1 : 1,
        startDate,
        endDate,
        description,
      };
      jsonData.push(newEntry);
      writeData("experience.json", jsonData);
      return res.status(200).json({ message: "Experience added successfully", ...newEntry });
    }

    if (req.method === "GET") {
      return res.status(200).json({ experiences: jsonData });
    }

    res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}
