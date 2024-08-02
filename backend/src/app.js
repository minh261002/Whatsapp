import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import createHttpError from 'http-errors';

const app = express();
dotenv.config();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(cookieParser());
app.use(compression());
app.use(fileUpload({
    useTempFiles: true,
}));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(async(req, res, next) => {
    next(createHttpError.NotFound('This route does not exist'));
});

app.use(async(err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message || 'Internal Server Error',
        }
    })
})

export default app;