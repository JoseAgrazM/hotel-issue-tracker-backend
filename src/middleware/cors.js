import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const listAccepted = [process.env.ACCEPTED_ORIGINS];

export const validateCors = ({ acceptedCors = listAccepted }) => {
	return cors({
		origin: (origin, callback) => {
			if (acceptedCors.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error('Cors no valido'));
			}
		},
	});
};

export const allCorsAccepted = () => {
	return cors({
		origin: (origin, callback) => {
			callback(null, true);
		},
	});
};
