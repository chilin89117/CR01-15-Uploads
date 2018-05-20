require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const cloudinary = require('cloudinary');
const formidable = require('express-formidable');

const app = express();

const port = process.env.PORT || 3000;

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');

app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('src'));

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

app.use(formidable({
  multiples: true
}));

app.get('/', (req, res) => {
  res.render('home_cloud')
});

app.post('/api/uploads', function (req, res, next) {
  cloudinary.uploader.upload(
    req.files.image.path,
    (result) => {
      console.log(result);
      res.status(200).send('OK');
    },
    {
      public_id: `${path.parse(req.files.image.name).name}_${Date.now()}`,
      resource_type: 'auto'
    }
  );
});

app.use((err, req, res, next) => {
  let msg = err.message + ' (' + (err.code?err.code:'') + ')';
  res.status(500).send(msg);
});

app.listen(port, ()=> console.log(`Started on port ${port}`));
