"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const Logging_1 = __importDefault(require("./library/Logging"));
const express = require('express');
const router = express();
const cron = require('node-cron');
const cors = require('cors');
const port = process.env.PORT || 3000;
mongoose_1.default
    .set('strictQuery', false)
    .connect(`${config_1.default.mongooseUrl}`, { retryWrites: true, w: 'majority' })
    .then(() => {
    Logging_1.default.info('mongoDB is connected');
    startServer();
})
    .catch((error) => {
    Logging_1.default.error('Unable to connect');
    Logging_1.default.error(error);
});
const User_1 = __importDefault(require("./routes/User"));
const ToDo_1 = __importDefault(require("./routes/ToDo"));
const startServer = () => {
    cron.schedule('0 0 * * *', () => {
        Logging_1.default.info('Running a task every day at 00:00');
    });
    router.use(cors({
        origin: ['http://localhost:3000']
    }));
    router.use((req, res, next) => {
        Logging_1.default.info(`Incoming -> Methode: [${req.method}] - Url: [${req.originalUrl}] - Ip: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logging_1.default.info(`Server Started -> Methode: [${req.method}] - Url: [${req.originalUrl}] - Ip: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json({}));
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept,Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    router.use('/user/', User_1.default);
    router.use('/todo/', ToDo_1.default);
    console.log('Server is started on port 3000');
    router.use((req, res, next) => {
        const error = new Error(`Route has been not found -> Methode: [${req.method}] - Url: [${req.originalUrl}]`);
        Logging_1.default.error(error.message);
        next();
        return res.status(404).json(error.message);
    });
    http_1.default.createServer(router).listen(config_1.default.port, () => Logging_1.default.info(`Server is started on new port ${config_1.default.port}`));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLGdEQUF3QjtBQUN4Qix3REFBZ0M7QUFDaEMsNkRBQXFDO0FBQ3JDLGdFQUF3QztBQUd4QyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsTUFBTSxNQUFNLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFDekIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUU3QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFDdEMsa0JBQVE7S0FDSCxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQztLQUN6QixPQUFPLENBQUMsR0FBRyxnQkFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUM7S0FDdEUsSUFBSSxDQUFDLEdBQUcsRUFBRTtJQUNQLGlCQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDckMsV0FBVyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDO0tBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDYixpQkFBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ25DLGlCQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDQUFDO0FBR1AseURBQXVDO0FBQ3ZDLHlEQUF1QztBQUd2QyxNQUFNLFdBQVcsR0FBRyxHQUFHLEVBQUU7SUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO1FBQzVCLGlCQUFPLENB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