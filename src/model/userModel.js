import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

export class userModel {
	static async createUser(data) {
		// Hacer la peticion la insercion de datos en la BD
		const { userName, surname, email, password, companyId, phone } = data;

		try {
			const salt = await bcryptjs.genSalt();

			const newPass = await bcryptjs.hash(password, salt);

			return await prisma.user.create({
				data: {
					userName,
					email,
					surname,
					password: newPass,
					companyId,
					phone,
				},
			});
		} catch (error) {
			throw new Error('Error al crear el user:', error);
		}
	}

	static async createAdmin(data) {
		// Hacer la peticion la insercion de datos en la BD

		try {
			const { name, surname, email, password, phone } = data;

			const salt = await bcryptjs.genSalt();

			const passHash = await bcryptjs.hash(password, salt);

			return await prisma.superAdmin.create({
				data: {
					name,
					email,
					surname,
					password: passHash,
					phone,
				},
			});
		} catch (error) {
			throw new Error('Error al crear el Admin:', error);
		}
	}

	static async getUserAndAdmin(column, value) {
		// Ahora no tendre que repetir codigo tan parecido llamo a get user
		// Y recupero ya sea email = 'asdasdas@gmail.com' o por id: 'dasdsadsa'
		if (!value) return false;

		try {
			const whereClausule = { [column]: value };

			let user = await prisma.user.findUnique({
				where: whereClausule,
				include: {
					posts: true,
					company: true,
				},
			});

			if (!user) {
				user = await prisma.superAdmin.findUnique({
					where: whereClausule,
					include: {
						posts: true,
						companies: true,
					},
				});
			}

			return user;
		} catch (error) {
			throw new Error('Error al recuperar el user:', error);
		}
	}

	static async login(email, password) {
		try {
			const user = await userModel.getUserAndAdmin('email', email);

			if (!user) return false;

			const validPassword = await bcryptjs.compare(
				password,
				user.password
			);

			if (!validPassword) return false;

			return user;
		} catch (error) {
			throw new Error('Error al recuperar el user:', error);
		}
	}

	static async getUser(column, value) {
		// Ahora no tendre que repetir codigo tan parecido llamo a get user
		// Y recupero ya sea email = 'asdasdas@gmail.com' o por id: 'dasdsadsa'
		if (!value) return false;
		try {
			const whereClausule = { [column]: value };

			return await prisma.user.findUnique({
				where: whereClausule,
				include: {
					posts: true,
					company: true,
				},
			});
		} catch (error) {
			throw new Error('Error al recuperar el user:', error);
		}
	}

	static async getAdmin(column, value) {
		// Ahora no tendre que repetir codigo tan parecido llamo a get user
		// Y recupero ya sea email = 'asdasdas@gmail.com' o por id: 'dasdsadsa'
		if (!value) return false;

		try {
			const whereClausule = { [column]: value };

			return await prisma.superAdmin.findUnique({
				where: whereClausule,
				include: {
					posts: true,
					companies: true,
				},
			});
		} catch (error) {
			throw new Error('Error al recuperar el user:', error);
		}
	}

	static async deleteUser(uid) {
		return await prisma.user.delete({
			where: {
				id: uid,
			},
		});
	}

	static async getUsersFromCompanyId(column, value) {
		if (!value) return false;

		try {
			const whereClausule = { [column]: value };

			const users = await prisma.user.findMany({
				where: whereClausule,
			});

			return users;
		} catch (error) {
			throw new Error('Error al recuperar el user:', error);
		}
	}

	//TODO: EDITAR USUARIOS

	static async updatedUser(id, user) {
		const { userName, surname, phone, role, email, companyId } = user;

		try {
			return await prisma.user.update({
				where: {
					id: id,
				},
				data: {
					userName,
					surname,
					phone,
					role,
					email,
					companyId,
					updatedAt: new Date(),
				},
			});
		} catch (error) {
			throw new Error('Error al recuperar el user:', error);
		}
	}
	static async updatedAdmin(id, admin) {
		const { name, surname, phone, role, email } = admin;

		try {
			return await prisma.superAdmin.update({
				where: {
					id: id,
				},
				data: {
					name,
					surname,
					phone,
					role,
					email,
					updatedAt: new Date(),
				},
			});
		} catch (error) {
			throw new Error('Error al actualizar el admin:', error);
		}
	}
}
