import express from 'express';
import dotenv from 'dotenv';
import userRouter from './router/userRouter.js';
import companyRouter from './router/companyRouter.js';
import roomRouter from './router/roomRouter.js';
import postRouter from './router/postRouter.js';
// import { sendEmail } from './lib/emails.plugin.js';
import { corsOptions } from './middleware/cors.js';

dotenv.config();

const app = express();
app.disable('x-powered-by');
app.use(express.json());

app.use(corsOptions());

// Rutas
app.use('/api/auth', userRouter);
app.use('/api/company', companyRouter);
app.use('/api/room', roomRouter);
app.use('/api/post', postRouter);

const port = process.env.PORT ?? 3001;

app.listen(port, async () => {
	console.log(`Servidor corriendo en el puerto ${port}`);
});
