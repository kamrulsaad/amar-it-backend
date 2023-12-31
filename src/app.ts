import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import httpStatus from 'http-status';
import routes from './app/routes';

const app: Application = express();

// Middlewares
app.use(
    cors({
        credentials: true,
        origin: [
            'https://amar-it-frontend.vercel.app',
            'http://localhost:3000',
        ],
    }),
);
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

// Global error handler
app.use(globalErrorHandler);

// 404 Route
app.use((req: Request, res: Response, next: NextFunction) => {
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
    next();
});

export default app;
