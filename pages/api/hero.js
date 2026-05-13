import { readData, writeData } from "@/lib/dataStore";

const DEFAULT_HERO = {
  title: "Full stack Mern Developer",
  typedText: ["Hello, My Name IS Zia ur Rehman!", "I am Software Engineer"],
  titleSize: 40,
  typedTextSize: 50,
};

export default function handler(req, res) {
  try {
    const jsonData = readData("hero.json", DEFAULT_HERO);

    if (req.method === "POST") {
      const { title, typedText, titleSize, typedTextSize } = req.body;
      if (!title || !typedText || !Array.isArray(typedText)) {
        return res.status(400).json({ error: "Invalid data." });
      }
      const newData = {
        title,
        typedText,
        titleSize: titleSize || 40,
        typedTextSize: typedTextSize || 50,
      };
      writeData("hero.json", newData);
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
