import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";
import "dotenv/config.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "file-storage",
    public_id: (req, file) => {
      const extlessName = file.originalname.replace(/\.[^/.]+$/, "");
      const safeName = extlessName.replace(/\s+/g, "-").toLowerCase();
      return `${Date.now()}-${safeName}`;
    },
    resource_type: "auto",
  },
});


const upload = multer({ storage });

export default upload;
