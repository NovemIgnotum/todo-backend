import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    mongooseUrl: process.env.MONGOOSE_URL || 'mongodb://mongodb:27017/vibeo'
};
