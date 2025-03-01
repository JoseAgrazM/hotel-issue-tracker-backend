import express from 'express';
import dotenv from 'dotenv';
import { allCorsAccepted } from './middleware/cors.js';
import userRouter from './router/userRouter.js';
import companyRouter from './router/companyRouter.js';
import roomRouter from './router/roomRouter.js';
import postRouter from './router/postRouter.js';
import { sendEmail } from './lib/emails.plugin.js';
dotenv.config();

const app = express();
app.disable('x-powered-by');
app.use(express.json());

// CORS
app.use(allCorsAccepted());

// Rutas
app.use('/api/auth', userRouter); //todo: Actualizar el perfil propio o si eres superAdmin
app.use('/api/company', companyRouter); //* Check
app.use('/api/room', roomRouter); //* Check
app.use('/api/post', postRouter); //todo: Actualizar el post propio o si eres superAdmin

const port = process.env.PORT ?? 4000;

app.listen(port, async () => {
	console.log(`Servidor corriendo en el puerto ${port}`);
});
