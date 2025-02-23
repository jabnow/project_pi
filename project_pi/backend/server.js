require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const Grid = require('gridfs-stream');
const { Readable } = require('stream');

const app = express();
app.use(cors());

// Mongo URI
// debugging weird error:
console.log('Mongo URI is :', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
    console.log('MongoDB Atlas is connected yay!');
    // GridFS
    Grid.mongo = mongoose.mongo;
});

// multer: don't save locally, pass to GridFS
const storage = multer.memoryStorage();
const upload = multer({ storage });

// route to upload a file, API endpoint
app.post('/upload', upload.single('resume'), async (req, res) => {
    try {
        if(!req.file) {
            res.status(400).send({ error: 'No file uploaded'});
            return;
        }

        const readableStream = new Readable();
        readableStream.push(req.file.buffer);
        readableStream.push(null);

        // GridFS stream
        const gfs = new Grid(mongoose.connection.db);
        
        const writestream = gfs.createWriteStream({
            filename: req.file.originalname
        });

        readableStream.pipe(writestream);

        writestream.on('close', (file) => {
            console.log('File uploaded to GridFS');
            res.json(file);
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'this is very bad...' });
    }
    });


    // get file by ID inside DB

    app.get('/file/:id', async (req, res) => {
        try {
          const gfs = new Grid(mongoose.connection.db);
      
          // try search by ObjectId
          gfs.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, file) => {
            if (!file) {
              return res.status(404).json({ error: 'File not found' });
            }
      
            // readstream to the client
            const readStream = gfs.createReadStream({ _id: file._id });
            res.set('Content-Type', file.contentType);
            readStream.pipe(res);
          });
        } 
        catch (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error fetching file' });
        }
      });


    // start server
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

