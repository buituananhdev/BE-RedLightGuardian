import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../config/cloudinary.config.js';
var today = new Date();
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: today.getDate().toString(),
    public_id: (req, file) => file.originalname
  }
});

const upload = multer({ storage: storage });

export default upload;
