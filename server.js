const express = require('express');
const root = require('path').join(__dirname, 'client/build');
const path= require('path');
const crypto= require('crypto');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer= require('multer');
const {GridFsStorage}= require('multer-gridfs-storage');
const Grid = require("gridfs-stream");
const methodOverRide= require('method-override');

//server set up
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(methodOverRide('_method'))
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


app.use(express.static(root));
const mongoURI=process.env.MONGODB_URI || 'mongodb://localhost/ecom';
mongoose.connect(mongoURI,  {
  useNewUrlParser: true,
});
// mongoose.createConnection(mongoURL)
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


let gfs;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'images',
  });
});



const storage = new GridFsStorage({
  url: mongoURI,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    // this function runs every time a new file is created
    return new Promise((resolve, reject) => {
      // use the crypto package to generate some random hex bytes
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
     
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'images',
        };
      
        resolve(fileInfo);
      });
    });
  },
});
const store = multer({
  storage,
  // limit the size to 20mb for any files coming in
  limits: { fileSize: 20000000 },
  // filer out invalid filetypes
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
function checkFileType(file, cb) {
  // https://youtu.be/9Qzmri1WaaE?t=1515
  // define a regex that includes the file types we accept
  const filetypes = /jpeg|jpg|png|gif/;
  //check the file extention
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // more importantly, check the mimetype
  const mimetype = filetypes.test(file.mimetype);
  // if both are good then continue
  if (mimetype && extname) return cb(null, true);
  // otherwise, return error message
  cb('filetype');
}
const uploadMiddleware = (req, res, next) => {
  const upload = store.single('image');
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send('File too large');
    } else if (err) {
      // check if our filetype error occurred
      if (err === 'filetype') return res.status(400).send('Image files only');
      // An unknown error occurred when uploading.
      return res.sendStatus(500);
    }
    // all good, proceed
    
    next();
  });
};

// const deleteImage = (id) => {
//   if (!id || id === 'undefined') return res.status(400).send('no image id');
//   const _id = new mongoose.Types.ObjectId(id);
//   gfs.delete(_id, (err) => {
//     if (err) return res.status(500).send('image deletion error');
//   });
// };

app.post('/api/upload',uploadMiddleware,(req, res)=>{
  const { file } = req;
  const { id } = file;
  res.json(id)
 
})

app.get('/api/img/:id', (req, res) => {
  const id=req.params.id
  const _id = new mongoose.Types.ObjectId(id);
  console.log(id)
  console.log('getting img')

  gfs.find({'_id':_id}).toArray((err, files) => {
    if (!files || files.length === 0)
    return res.status(404).send('no files exist');
    gfs.openDownloadStream(files[0]._id).pipe(res);

  });
});



app.use(require('./database/apiRoutesGet'))
app.use(require('./database/apiRoutesPost'))

app.get("*", (req, res) => {
  res.sendFile('index.html', { root });
})

app.listen(port, ()=> console.log(`Listening on port ${port}`))