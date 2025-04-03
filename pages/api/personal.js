import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "data", "personal.json");

export default function handler(req, res) {

    console.log('hi');
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf-8"); 
    }

    let rawData = fs.readFileSync(filePath, "utf-8");
    let jsonData;

    try {
      jsonData = rawData.trim() ? JSON.parse(rawData) : [];
    } catch (error) {
      jsonData = [];
    }

    if (req.method === "POST") {
      const { github, whatsapp, email,linkedin } = req.body;

     console.log(req.body);

      const newUpload = {
        id: jsonData.length + 1,
        github,
         whatsapp,
          email,
          linkedin
      };

      jsonData.push(newUpload);

      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

      return res.status(200).json({ message: "Experience added successfully", ...newUpload });
    }

    if (req.method === "GET") {
      return res.status(200).json({ experiences: jsonData });
    }

    res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
