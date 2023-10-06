import express from 'express';
import fs from 'fs'
import multer from 'multer';

import cors from 'cors'
const app = express();
app.use(cors())
const port = 3012;

// Sử dụng Multer để xử lý tệp tin được gửi lên
const storage = multer.memoryStorage(); // Lưu trữ ảnh trong bộ nhớ
const upload = multer({ storage: storage });

// Định tuyến cho API
app.post('/upload', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Vui lòng gửi ảnh.');
    }

    // Lưu ảnh vào máy tính của bạn
    const imageBuffer = req.file.buffer;
    const imagePath = './images' + Date.now() + '.jpg';

    fs.writeFileSync(imagePath, imageBuffer);

    return res.send(
        'Ảnh đã được tải lên thành công và lưu trữ tại: ' + imagePath
    );
});

app.listen(port, () => {
    console.log(`Server đang lắng nghe tại cổng ${port}`);
});
