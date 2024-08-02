import app from './app.js';
import logger from './configs/logger.config.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;
const {DATABASE_URL} = process.env;

mongoose.connection.on('error', (error) => {
    logger.error(error);
    process.exit(1);
});

if(process.env.NODE_ENV !== 'production'){
    mongoose.set('debug', true);
};

mongoose.connect(DATABASE_URL).then(() => {
    logger.info('Connected to the database');
}).catch((error) => {
    logger.error(error);
});

let server;
server = app.listen(PORT, () => {
    console.log(process.pid);
    logger.info(`Server is running on port ${PORT}`);
});

const exitHandler = () => {
    if(server){
        logger.info('Server is closing...');
        process.exit(1);
    }else{
        process.exit(1);
    }
}

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
}

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on("SIGTERM", () => {
    if(server){
        logger.info('SIGTERM received');
        process.exit(1);
    }
});