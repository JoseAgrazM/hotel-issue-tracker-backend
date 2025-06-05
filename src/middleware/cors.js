import cors from 'cors';

export const corsOptions = () =>
	cors({
		origin: (origin, callback) => {
			// Permitir todas las solicitudes sin comprobar el origen
			callback(null, true);
		},
	});
