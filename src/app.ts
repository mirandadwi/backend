import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import matkulRoutes from './routes/matkulRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/matkuls', matkulRoutes);

export default app;
