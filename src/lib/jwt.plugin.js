import jwt from 'jsonwebtoken';

export const genJWT = (uid, name, role) => {
	return new Promise((resolve, reject) => {
		const payload = { uid, name, role };

		jwt.sign(
			payload,
			process.env.SECRET_JWT_WORD,
			{
				expiresIn: '12h',
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('No se pudo generar el token');
				}

				resolve(token);
			}
		);
	});
};
