import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "/data/data.json"); // Correct path handling

  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf-8"); // Ensure the file exists
    }

    let rawData = fs.readFileSync(filePath, "utf-8");
    let jsonData = JSON.parse(rawData); // Convert JSON string to JS object

    if (req.method === "POST") {
        console.log(req.body);
      const { id } = req.body; // Correct way to extract projectId
console.log(id);
console.log(jsonData);
      jsonData = jsonData.filter((value) => value.id!==Number(id) );
console.log(jsonData);
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

      return res.status(200).json({ message: "✅ Project deleted!", data: jsonData });
    }

    return res.status(405).json({ error: "❌ Method Not Allowed" });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({ error: error.message });
  }
}






 