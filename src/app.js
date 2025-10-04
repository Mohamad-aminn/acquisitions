import express from 'express';
import route from './routes/k8s.js';
import authRoute from './routes/auth.js';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from "#configs/logger.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "#configs/db.js";

const app = express();


app.use(helmet());
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

app.use('/', route);
app.use("/auth", authRoute)

export default app;
