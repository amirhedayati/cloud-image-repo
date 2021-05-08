const path = require('path');
const cors = require('cors');
const express = require('express');
const cloudinary = require('cloudinary').v2;
const app = express();

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

app.get('/api/images', async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression(`folder:repo AND tags=${req.headers['user']}`)
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

    const cloudinaryPaths = resources.map((file) => file.public_id);
    res.send(cloudinaryPaths);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

app.post('/api/upload', async (req, res) => {
  try {
    const payload = req.headers;

    await cloudinary.uploader.upload(payload, {
      upload_preset: 'khxzubw4'
    });
    res.json({ msg: 'Successfully uploaded image' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

app.post('/api/delete', async (req, res) => {
  try {
    const imageId = req.headers["imageid"];

    await cloudinary.uploader.destroy(imageId, function (error, result) {
      console.log(error)
    });;
    res.json({ msg: 'Successfully deleted image' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
