import express from 'express';
import route from './routes/k8s.js';
import helmet from 'helmet';

const app = express();

app.use('/', route);
app.use(helmet());

export default app;
