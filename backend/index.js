const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');

const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(cors({ origin: '*', methods: ['POST'], allowedHeaders: ['Content-Type'] }));


// Multer setup to store image in memory (Buffer)
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/ocr', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file received' });
    }

    console.log("Received File:", req.file.originalname);
    res.json({ message: "File uploaded successfully", filename: req.file.originalname });
});




app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
