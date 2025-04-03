import multer from "multer";
import path from "path";
import fs from "fs";



const filePath = path.join(process.cwd(), "data", "skills.json");
const uploadDir = path.join(process.cwd(), "public/skills");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

export default function handler(req, res) {
  if (req.method === "POST") {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: "File upload failed" });
      }

      const { title } = req.body;
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]", "utf-8"); // Create file if not exists
      }
  
      let rawData = fs.readFileSync(filePath, "utf-8");
      let jsonData = JSON.parse(rawData); 
      const newUpload = {
        id: jsonData.length + 1,
        imageUrl: `/skills/${req.file.filename}`,
        title,
      
      };
   
  
      // 2️⃣ Add new data to the array
      jsonData.push(newUpload);
  
      // 3️⃣ Write the updated data back to the file
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

      res.status(200).json({ message: "File uploaded successfully", ...newUpload });
    });
  } else if (req.method === "GET") {
    let rawData = fs.readFileSync(filePath, "utf-8");
    let jsonData = JSON.parse(rawData); 
    res.status(200).json({ jsonData });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

// Required for multer to work properly
export const config = {
  api: {
    bodyParser: false,
  },
};
