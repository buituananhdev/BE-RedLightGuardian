import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../config/cloudinary.config.js";
const today = new Date();
const year = today.getFullYear().toString();
const month = (today.getMonth() + 1).toString().padStart(2, "0");
const day = today.getDate().toString().padStart(2, "0");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: `${day}/${month}/${year}`,
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage });

export default upload;
