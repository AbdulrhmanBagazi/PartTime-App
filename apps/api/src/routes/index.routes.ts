import express, { Application } from 'express';
import Client from './client.routes';

const app: Application = express();

app.use('/client', Client);

export default app;
