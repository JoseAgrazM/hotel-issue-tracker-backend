import { response } from 'express';
import jwt from 'jsonwebtoken';

export const validateJWT = (req, res = response, next) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No hay token',
		});
	}

	try {
		const { uid, name, role } = jwt.verify(
			token,
			process.env.SECRET_JWT_WORD
		);

		req.uid = uid;
		req.name = name;
		req.role = role;
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Token no valido',
		});
	}

	next();
};
