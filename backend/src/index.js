import app from './app.js';
import logger from './configs/logger.config.js';

const PORT = process.env.PORT || 3000;

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