const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Ensure converted directory exists
const convertedDir = path.join(__dirname, 'converted');
if (!fs.existsSync(convertedDir)) {
  fs.mkdirSync(convertedDir, { recursive: true });
}

// Routes
app.get('/', (req, res) => {
  res.send('FileForge Backend is running!');
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Fayl lama soo gelinin.' });
  }
  res.json({
    message: 'Faylka si guul leh ayaa loo kaydiyay.',
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size
  });
});

app.post('/convert', async (req, res) => {
  const { filename, targetFormat } = req.body;
  if (!filename || !targetFormat) {
    return res.status(400).json({ error: 'Filename and targetFormat are required.' });
  }

  const filePath = path.join(__dirname, 'uploads', filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found.' });
  }

  // NOTE: For full CloudConvert implementation, you need to use their API or SDK.
  // This is a placeholder structure to illustrate how it would work.
  // In a real scenario, you'd upload the file, wait for conversion, and download it.
  
  console.log("Checking API KEY... Exists:", !!process.env.CLOUDCONVERT_API_KEY);
  if (!process.env.CLOUDCONVERT_API_KEY || process.env.CLOUDCONVERT_API_KEY === 'your_cloudconvert_api_key_here') {
    console.log("API Key is missing or default string!");
    return res.status(400).json({ error: 'Fadlan geli CloudConvert API Key-gaaga faylka .env!' });
  }

  try {
    const CloudConvert = require('cloudconvert');
    const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY.trim());

    let job = await cloudConvert.jobs.create({
      tasks: {
        'import-my-file': {
          operation: 'import/upload'
        },
        'convert-my-file': {
          operation: 'convert',
          input: 'import-my-file',
          output_format: targetFormat
        },
        'export-my-file': {
          operation: 'export/url',
          input: 'convert-my-file'
        }
      }
    });

    const uploadTask = job.tasks.filter(task => task.name === 'import-my-file')[0];
    const readStream = fs.createReadStream(filePath);
    await cloudConvert.tasks.upload(uploadTask, readStream, filename);

    job = await cloudConvert.jobs.wait(job.id);

    const exportTask = job.tasks.filter(task => task.name === 'export-my-file')[0];
    if (exportTask.status !== 'finished') {
      throw new Error('Shaqada beddelidda way guul darraysatay.');
    }

    const fileResult = exportTask.result.files[0];
    const convertedFilename = fileResult.filename;
    const downloadUrlExternal = fileResult.url;

    // Download the converted file to our local 'converted' directory
    const convertedPath = path.join(__dirname, 'converted', convertedFilename);
    const response = await axios({
      method: 'GET',
      url: downloadUrlExternal,
      responseType: 'stream'
    });

    response.data.pipe(fs.createWriteStream(convertedPath));

    await new Promise((resolve, reject) => {
      response.data.on('end', resolve);
      response.data.on('error', reject);
    });

    res.json({
      message: 'Faylka si dhab ah ayaa loo beddelay!',
      convertedFilename: convertedFilename,
      downloadUrl: `http://localhost:${PORT}/download/${encodeURIComponent(convertedFilename)}`
    });

  } catch (error) {
    console.error('CloudConvert Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Qalad ayaa dhacay markii la beddelayay faylka: ' + (error.response?.data?.message || error.message) });
  }
});

app.get('/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'converted', filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found.' });
  }

  res.download(filePath);
});

// Periodic cleanup of old files (e.g. older than 1 hour)
setInterval(() => {
  const dirs = [path.join(__dirname, 'uploads'), path.join(__dirname, 'converted')];
  const now = Date.now();
  const ONE_HOUR = 60 * 60 * 1000;

  dirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.readdir(dir, (err, files) => {
        if (err) return;
        files.forEach(file => {
          const filePath = path.join(dir, file);
          fs.stat(filePath, (err, stats) => {
            if (err) return;
            if (now - stats.mtimeMs > ONE_HOUR) {
              fs.unlink(filePath, () => {});
            }
          });
        });
      });
    }
  });
}, 15 * 60 * 1000); // Check every 15 minutes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
