import multer from "multer";
import path from "path";
import fs from "fs";
import { readData, writeData } from "@/lib/dataStore";

const IS_VERCEL = process.env.VERCEL === "1";

// On Vercel, store uploaded images in /tmp (ephemeral).
// Locally, store in public/skills so they are served by Next.js.
const uploadDir = IS_VERCEL
  ? "/tmp/portfolio-uploads/skills"
  : path.join(process.cwd(), "public/skills");

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

      const { title } = req.body;
      const jsonData = readData("skills.json", []);

      const newEntry = {
        id: jsonData.length > 0 ? Math.max(...jsonData.map((e) => e.id)) + 1 : 1,
        // On Vercel images in /tmp can't be served directly.
        // Use a data URL or a public CDN in production — for now store the relative path.
        imageUrl: `/skills/${req.file.filename}`,
        title,
      };

      jsonData.push(newEntry);
      writeData("skills.json", jsonData);
      res.status(200).json({ message: "File uploaded successfully", ...newEntry });
    });
  } else if (req.method === "GET") {
    const jsonData = readData("skills.json", []);
    res.status(200).json({ jsonData });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export const config = { api: { bodyParser: false } };
