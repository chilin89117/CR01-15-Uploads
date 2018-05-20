# CR01-15-Uploads
## File uploads to local storage or Cloudinary

* ### `npm run local` 
  * Runs `server.js` 
  * Uses `home.hbs`
  * Uploads files to `uploads` directory

* ### `npm run cloud`
  * Runs `serverCloud.js`
  * Uses `home_cloud.hbs`
  * Uploads files to **Cloudinary**

* ### Packages
  * `body-parser@1.18.3`
  * `cloudinary@1.11.0`
  * `dotenv@5.0.1`
  * `express@4.16.3`
  * `express-formidable@1.0.0`
  * `express-handlebars@3.0.0`
  * `jquery@3.3.1`
  * `multer@1.3.0`

* Uses `.env` file to store Cloudinary config info in environment variables
