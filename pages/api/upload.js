import multer from "multer";
import path from "path";
import fs from "fs";
import { readData, writeData } from "@/lib/dataStore";

const IS_VERCEL = process.env.VERCEL === "1";

const uploadDir = IS_VERCEL
  ? "/tmp/portfolio-uploads/projects"
  : path.join(process.cwd(), "public/projects");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

export default function handler(req, res) {
  if (req.method === "POST") {
    upload.single("image")(req, res, (err) => {
      if (err) return res.status(500).json({ error: "File upload failed" });
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const { title, description, gitHubLink, websiteUrl } = req.body;
      const jsonData = readData("data.json", []);

      const newEntry = {
        id: jsonData.length > 0 ? Math.max(...jsonData.map((e) => e.id)) + 1 : 1,
        imageUrl: `/projects/${req.file.filename}`,
        title,
        description,
        gitHubLink,
        websiteUrl,
      };

      jsonData.push(newEntry);
      writeData("data.json", jsonData);
      res.status(200).json({ message: "File uploaded successfully", ...newEntry });
    });
  } else if (req.method === "GET") {
    const jsonData = readData("data.json", []);
    res.status(200).json({ jsonData });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export const config = { api: { bodyParser: false } };
