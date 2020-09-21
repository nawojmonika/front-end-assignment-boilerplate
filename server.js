const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const opn = require('opn');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const host = 'http://localhost:3000/';
const IMAGE_URL = 'public/images/';

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
      setTimeout(() => {
        const image = req.files.image;
        const url = `${IMAGE_URL}${uuidv4()}`;
        image.mv(url);

        res.send({
          status: true,
          message: 'File is uploaded',
          data: {
            url: `${host}${url}`,
            name: image.name,
            mimetype: image.mimetype,
            size: image.size,
          },
        });
      }, 2000);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.use('/public', express.static(__dirname + '/public'));

app.listen(3000, function() {
  console.log('Example app-component listening on port 3000!\n');
  opn(host);
});
