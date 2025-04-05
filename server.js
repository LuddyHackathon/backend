import express, { Router } from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
const { urlencoded, json } = bodyParser;
import { mustache } from 'consolidate';

import router from './routes/routes.js';

const app = express();
const port = 65535;

app.engine('html', mustache);
app.set('view engine', 'html');

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(fileUpload());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
