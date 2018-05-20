const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');
const app = express();
const ftype = '.png';

const port = process.env.PORT || 3000;

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');

app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('src'));

app.get('/', (req, res) => {
  res.render('home')
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, 
    path.basename(file.originalname, ftype) + '-' + Date.now() + ftype
  )
});

const upload = multer({
  // dest: 'uploads/',
  storage,
  limits: {fileSize: 50000},
  fileFilter: (req, file, cb) => {
    if(path.extname(file.originalname) !== ftype) cb(new Error('Wrong filetype!'));
    else cb(null, true);
  }
}).fields([
  {name: 'image1', maxCount: 1},
  {name: 'image2', maxCount: 2}
]);

app.post('/api/uploads', function (req, res, next) {
  upload(req, res, (err) => {
    if(err) next(err);
    else res.status(200).send('File(s) uploaded.');
  });
});

app.use((err, req, res, next) => {
  let msg = err.message + ' (' + (err.code?err.code:'') + ')';
  res.status(500).send(msg);
});

app.listen(port, ()=> console.log(`Started on port ${port}`));
