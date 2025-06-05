import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

export const corsOptions = () =>
	cors({
		origin: (origin, callback) => {
			// Permitir todas las solicitudes sin comprobar el origen
			callback(null, true);
		},
	});
