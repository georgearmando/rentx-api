import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';

import './database';
import './shared/container';
import { routes } from './routes';
import swaggerFile from './swagger.json';
import { AppError } from './errors/AppErrors';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(routes);

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

app.listen(3333, () => {
  console.log('Server is running on port 3333!')
});
