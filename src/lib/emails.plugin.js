import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
	service: process.env.MAILER_SERVICE,
	auth: {
		user: process.env.MAILER_EMAIL,
		pass: process.env.MAILER_SECRET_KEY,
	},
});

export const sendEmail = async data => {
	const { name, email, token } = data;
	try {
		const sentInfo = await transporter.sendMail({
			from: '"HotelApp - " <emailHotelApp@gmai.com>',
			to: email,
			subject: 'Recuperar contraseña',
			html: `
            <h2>Hola ${nombre}</h2>
            <p>Recupera tu contraseña haciendo click en el siguiente enlace</p>
            <a href="${process.env.FRONTEND_URL}/restart-password/${token}">Recuperar contraseña</a>
            <hr />
            <p>Si no has sido tú quien ha pedido recuperar la contraseña, ignora este mensaje</p>
        `,
		});

		console.log(sentInfo);

		return true;
	} catch (error) {
		return false;
	}
};
