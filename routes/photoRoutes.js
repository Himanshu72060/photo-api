const express = require('express');
const router = express.Router();
const multer = require('multer');
const Photo = require('../models/Photo');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

router.post('/', upload.array('images', 3), async (req, res) => {
    const { title } = req.body;
    const imagePaths = req.files.map(file => file.path);
    const photo = new Photo({ title, images: imagePaths });
    await photo.save();
    res.json(photo);
});

router.get('/', async (req, res) => {
    const photos = await Photo.find();
    res.json(photos);
});

router.put('/:id', upload.array('images', 3), async (req, res) => {
    const { title } = req.body;
    const imagePaths = req.files.map(file => file.path);
    const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, {
        title,
        images: imagePaths,
    }, { new: true });
    res.json(updatedPhoto);
});

router.delete('/:id', async (req, res) => {
    await Photo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Photo deleted' });
});

module.exports = router;
