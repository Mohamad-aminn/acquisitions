import express from 'express';
import route from './routes/k8s.js';

const app = express();

app.use('/', route);

export default app;
