const express = require('express');
const multer = require('multer');
const Image = require('../models/img_uplod');
const router = express.Router();

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const image = new Image({
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });
    await image.save();
    res.status(200).json({ image_id: image._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/getImg/:id', async (req, res) => {
    try {
      const image = await Image.findById(req.params.id);
  
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      res.set('Content-Type', image.contentType);
      res.send(image.data);
    // const images = await Image.find();
    // res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
