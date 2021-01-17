import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from '@shared/infra/http/routes';

import errorHandler from '@shared/middlewares/errorHandler';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log(`🚀 development server started at port 3000 🚀`);
});
