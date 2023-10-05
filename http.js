const express = require('express');
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Đường dẫn tới thư mục chứa ảnh
const imageFolder = 'images';

// Tạo thư mục ảnh nếu chưa tồn tại
if (!fs.existsSync(imageFolder)) {
    fs.mkdirSync(imageFolder);
}

// Xử lý yêu cầu nhận ảnh từ ESP32-CAM
app.post('/upload', (req, res) => {
    const imageData = req.body.imageData;

    // Tạo tên file ảnh dựa trên thời gian hiện tại
    const timestamp = Date.now();
    const imageName = `${timestamp}.jpg`;
    const imagePath = `${imageFolder}/${imageName}`;

    // Lưu ảnh vào thư mục
    fs.writeFile(imagePath, imageData, 'base64', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(`Ảnh đã được lưu tại: ${imagePath}`);
            res.status(200).send('Ảnh đã được nhận và lưu trữ.');
        }
    });
});

// Tạo server HTTP để lắng nghe yêu cầu từ ESP32-CAM
const server = http.createServer(app);
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server đang lắng nghe trên cổng ${PORT}`);
});
