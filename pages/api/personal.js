import { readData, writeData } from "@/lib/dataStore";

export default function handler(req, res) {
  try {
    const jsonData = readData("personal.json", []);

    if (req.method === "POST") {
      const { github, whatsapp, email, linkedin } = req.body;
      const newEntry = {
        id: jsonData.length > 0 ? Math.max(...jsonData.map((e) => e.id)) + 1 : 1,
        github,
        whatsapp,
        email,
        linkedin,
      };
      jsonData.push(newEntry);
      writeData("personal.json", jsonData);
      return res.status(200).json({ message: "Personal data added successfully", ...newEntry });
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
