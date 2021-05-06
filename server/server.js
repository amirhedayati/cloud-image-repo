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
    console.log('inside GET function');
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
    const uploadResponse = await cloudinary.uploader.upload(payload, {
      upload_preset: 'khxzubw4'
    });
    console.log(uploadResponse);
    res.json({ msg: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
