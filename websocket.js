const express = require('express');
const expressWs = require('express-ws');
const fs = require('fs');
const path = require('path');
const app = express();
expressWs(app);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket endpoint for receiving images
app.ws('/image', (ws, req) => {
  console.log('WebSocket connection opened');

  ws.on('message', (data) => {
    // Handle the received image data (you can save it to a file or process it as needed)
    console.log('Received image data');
    fs.writeFileSync('received_image.jpg', data);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
