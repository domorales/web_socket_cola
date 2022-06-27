import cors from 'cors';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express(),
	dir_public = path.join(__dirname, '../frontend');

app.set('port', process.env.PORT || 3000);

app.use(cors()).use(express.static(dir_public));

export default app;
