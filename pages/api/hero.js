import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "data", "hero.json");

export default function handler(req, res) {
  try {
    const dirPath = path.join(process.cwd(), "data");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
      const defaultData = {
        title: "Full stack Mern Developer",
        typedText: ["Hello, My Name IS Zia ur Rehman!", "I am Software Engineer"],
        titleSize: 40,
        typedTextSize: 50
      };
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), "utf-8");
    }

    let rawData = fs.readFileSync(filePath, "utf-8");
    let jsonData;

    try {
      jsonData = rawData.trim() ? JSON.parse(rawData) : {};
    } catch (error) {
      jsonData = {};
    }

    if (req.method === "POST") {
      const { title, typedText, titleSize, typedTextSize } = req.body;

      if (!title || !typedText || !Array.isArray(typedText)) {
        return res.status(400).json({ error: "Invalid data." });
      }

      const newData = { 
        title, 
        typedText, 
        titleSize: titleSize || 40, 
        typedTextSize: typedTextSize || 50 
      };
      fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), "utf-8");

      return res.status(200).json({ message: "Hero content updated", data: newData });
    }

    if (req.method === "GET") {
      return res.status(200).json(jsonData);
    }

    res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}
