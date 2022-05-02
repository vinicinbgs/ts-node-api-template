import loadEnvs from './config/envs';
loadEnvs();

import express from 'express';
import { Server } from 'http';
import { routes } from './config/routes';

import BaseException, { IBaseException } from './exceptions/BaseException';

import { relationalDB } from './databases';

const port = parseInt(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

const app = express();

const psql = relationalDB;

const gracefulShutdown = async (code: any, server?: Server) => {
  console.log(code);

  (await psql).destroy();

  if (server) server.close();
};

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.use((err: IBaseException | Error, _, res: express.Response, next: express.NextFunction) => {
  console.log(err);

  if (err instanceof BaseException) {
    return res.status(err.getStatus()).send({
      code: err.getStatus(),
      message: err.getFinalMessage() || err.message,
    });
  }

  res.sendStatus(500);
  next();
});

psql.then(() => {
  const server = app.listen(port, host, async () => {
    console.log(`Server running at ${port}`);
  });

  process.on('SIGINT', (code) => {
    gracefulShutdown(code, server);
  });
});

process.on('uncaughtException', (code) => {
  console.log('uncaughtException', code);
});

process.on('unhandledRejection', (code) => {
  console.log('unhandledRejection', code);
});

export default app;
