import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response, NextFunction } from 'express';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';

import '@shared/container';
import createConnection from '@shared/infra/typeorm';
import { routes } from './routes';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter'
import swaggerFile from '../../../swagger.json';
import { AppError } from '@shared/errors/AppErrors';
import upload from "@config/upload";

createConnection();

const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(cors());
app.use(routes);

app.use(Sentry.Handlers.errorHandler());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app }
