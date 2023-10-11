import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import httpStatus from 'http-status';
import routes from './app/routes';
const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(globalErrorHandler);

app.use('/api/v1', routes);

app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Welcome to the AMAR_IT API server',
  });
});

// 404 Route
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found on the server',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Route not found on the server',
      },
    ],
  });
});

export default app;
