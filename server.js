const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const opn = require('opn');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }),
);

app.use(
  fileUpload({
    createParentPath: true,
  }),
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/upload-image', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded',
      });
    } else {
      let image = req.files.image;

      image.mv('./public/images/' + image.name);

      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: image.name,
          mimetype: image.mimetype,
          size: image.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!\n');
  opn('http://localhost:3000/');
});
