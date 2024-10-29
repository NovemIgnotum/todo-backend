// MODULES
import { Request, Response, NextFunction } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import config from './config/config';
import Logging from './library/Logging';

// Library
const express = require('express');
const router = express();
const cron = require('node-cron');
const cors = require('cors');

const port = process.env.PORT || 3000;
mongoose
    .set('strictQuery', false)
    .connect(`${config.mongooseUrl}`, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('mongoDB is connected');
        startServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect');
        Logging.error(error);
    });

// ROUTES
import UserRoutes from './routes/User';
import ToDoRoutes from './routes/ToDo';

// The server start only if mongo is already connected
const startServer = () => {
    cron.schedule('0 0 * * *', () => {
        Logging.info('Running a task every day at 00:00');
    });

    router.use(
        cors({
            origin: ['http://localhost:3000']
        })
    );

    router.use((req: Request, res: Response, next: NextFunction) => {
        Logging.info(`Incoming -> Methode: [${req.method}] - Url: [${req.originalUrl}] - Ip: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logging.info(
                `Server Started -> Methode: [${req.method}] - Url: [${req.originalUrl}] - Ip: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
            );
        });
        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json({}));

    // The rules of the API
    router.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept,Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    // CRUDS
    router.use('/user/', UserRoutes);
    router.use('/todo/', ToDoRoutes);
    console.log('Server is started on port 3000');

    /**Error handling */
    router.use((req: Request, res: Response, next: NextFunction) => {
        const error = new Error(`Route has been not found -> Methode: [${req.method}] - Url: [${req.originalUrl}]`);
        Logging.error(error.message);
        next();
        return res.status(404).json(error.message);
    });

    http.createServer(router).listen(config.port, () => Logging.info(`Server is started on new port ${config.port}`));
};
