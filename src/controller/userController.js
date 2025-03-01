import { request, response } from 'express';
import { userModel } from '../model/userModel.js';
import { companyModel } from '../model/companyModel.js';
import { genJWT } from '../lib/jwt.plugin.js';

export class userController {
	static async createUser(req = request, res = response) {
		const data = req.body;
		const { email, userName, companyId, phone } = data;

		try {
			const company = await companyModel.getCompany('id', companyId);

			if (!company) {
				return res.status(404).json({
					ok: false,
					msg: `La empresa no existe`,
				});
			}

			let user = await userModel.getUserAndAdmin('email', email);
			if (user) {
				return res.status(400).json({
					ok: false,
					msg: `El usuario ya existe`,
				});
			}

			const existPhone = await userModel.getUserAndAdmin('phone', phone);
			if (existPhone) {
				return res.status(400).json({
					ok: false,
					msg: `El numero de telefono ya existe`,
				});
			}

			if (userName) {
				user = await userModel.createUser(data);

				const token = await genJWT(user.id, user.userName, user.role);

				return res.status(201).json({
					ok: true,
					user,
					token,
					msg: 'Usuario creado',
				});
			}

			user = await userModel.createAdmin(data);

			const token = await genJWT(user.id, user.userName, user.role);

			res.status(201).json({
				ok: true,
				user,
				token,
				msg: 'Admin creado',
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Error al crear el usuario, Hable con el administrador',
			});
		}
	}

	static async loginUser(req = request, res = response) {
		const { email, password } = req.body;
		try {
			const user = await userModel.login(email, password);

			if (!user) {
				return res.status(400).json({
					ok: false,
					msg: `Email o contraseña incorrecto`,
				});
			}

			if (!user.password) {
				return res.status(400).json({
					ok: false,
					msg: 'Email o contraseña incorrecto',
				});
			}

			const {
				id,
				userName,
				name,
				surname,
				phone,
				createdAt,
				updatedAt,
				role,
				companyId,
				posts,
				company,
				companies,
			} = user;

			const token = await genJWT(
				user.id,
				user.userName || user.name,
				user.role
			);

			res.status(200).json({
				ok: true,
				uid: id,
				name: userName || name,
				surname,
				phone,
				email,
				createdAt,
				updatedAt,
				role,
				companyId,
				posts,
				company,
				companies,
				token,
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Error al crear el usuario, Hable con el administrador',
			});
		}
	}

	//! ARMINISTRADOR *//

	static async createAdmin(req = request, res = response) {
		const data = req.body;
		const { email, phone } = data;

		try {
			let userAdmin = await userModel.getUserAndAdmin('email', email);
			if (userAdmin) {
				return res.status(400).json({
					ok: false,
					msg: `El usuario ya existe`,
				});
			}
			const existPhone = await userModel.getUserAndAdmin('phone', phone);
			if (existPhone) {
				return res.status(400).json({
					ok: false,
					msg: `El numero de telefono ya existe`,
				});
			}

			userAdmin = await userModel.createAdmin(data);
			const token = await genJWT(
				userAdmin.id,
				userAdmin.name,
				userAdmin.role
			);

			res.status(201).json({
				ok: true,
				userAdmin,
				token,
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Error al crear el usuario, Hable con el administrador',
			});
		}
	}

	static async deleteUser(req = request, res = response) {
		const { id } = req.params;

		let user = await userModel.getUser('id', id);

		if (!user) {
			return res.status(404).json({
				ok: false,
				msg: 'El usuario no existe',
			});
		}

		user = await userModel.deleteUser(id);

		res.status(200).json({
			ok: true,
			user,
			msg: 'El usuario fue eliminado con exito!',
		});
	}

	static async getUsersFromCompany(req = request, res = response) {
		const { idCompany } = req.params;

		try {
			const existCompany = await companyModel.getCompany('id', idCompany);

			if (!existCompany) {
				return res.status(404).json({
					ok: false,
					msg: 'La empresa no existe',
				});
			}

			const users = await userModel.getUsersFromCompanyId(
				'companyId',
				idCompany
			);

			if (!users) {
				return res.status(404).json({
					ok: false,
					msg: 'No hay usuarios en esa empresa',
				});
			}
			res.status(200).json({
				ok: true,
				users,
				msg: 'Recuperaste los usuarios con exito',
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Error al recuperar los usuarios, hable con el administrador',
			});
		}
	}

	static async renewToken(req, res) {
		const { uid, name, role } = req;

		const token = await genJWT(uid, name, role);

		res.status(200).json({
			ok: true,
			token,
			uid,
			name,
			role,
		});
	}

	static async editUser(req, res) {
		const { id } = req.params;
		const { userName, surname, email, role, companyId, phone } = req.body;

		let updatedUser = { userName, surname, email, role, companyId, phone };

		try {
			const user = await userModel.getUser('id', id);

			if (!user) {
				return res.status(404).json({
					ok: false,
					msg: 'No existe el usuario',
				});
			}

			const existEmail = await userModel.getUserAndAdmin('email', email);

			if (existEmail && existEmail.id !== id) {
				return res.status(404).json({
					ok: false,
					msg: 'Este email ya existe',
				});
			}

			const existPhone = await userModel.getUserAndAdmin('phone', phone);

			if (existPhone && existPhone.id !== id) {
				return res.status(404).json({
					ok: false,
					msg: 'Este telefono ya existe',
				});
			}

			const company = await companyModel.getCompany('id', companyId);

			if (!company) {
				return res.status(404).json({
					ok: false,
					msg: `La empresa no existe`,
				});
			}

			updatedUser = await userModel.updatedUser(id, updatedUser);

			res.status(200).json({
				ok: true,
				updatedUser,
				msg: 'Usuario actualizado con exito',
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Error al editar el usuario, hable con el administrador',
			});
		}
	}
	static async editAdmin(req, res) {
		const { id } = req.params;
		const { name, surname, email, role, companyId, phone } = req.body;

		let updatedAdmin = { name, surname, email, role, phone };

		try {
			const admin = await userModel.getAdmin('id', id);

			if (!admin) {
				return res.status(404).json({
					ok: false,
					msg: 'No existe el admin',
				});
			}

			const existEmail = await userModel.getUserAndAdmin('email', email);

			if (existEmail && existEmail.id !== id) {
				return res.status(404).json({
					ok: false,
					msg: 'Este email ya existe',
				});
			}

			const existPhone = await userModel.getUserAndAdmin('phone', phone);

			if (existPhone && existPhone.id !== id) {
				return res.status(404).json({
					ok: false,
					msg: 'Este telefono ya existe',
				});
			}

			updatedAdmin = await userModel.updatedAdmin(id, updatedAdmin);

			res.status(200).json({
				ok: true,
				updatedAdmin,
				msg: 'Admin actualizado con exito',
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Error al editar el admin, hable con el administrador',
			});
		}
	}

	static async getUserId(req, res) {
		const { id } = req.params;

		try {
			const user = await userModel.getUserAndAdmin('id', id);

			const {
				name,
				userName,
				surname,
				phone,
				email,
				createdAt,
				updatedAt,
				role,
				companyId,
				posts,
				company,
			} = user;

			if (!user) {
				return res.status(404).json({
					ok: false,
					msg: 'El usuario no existe',
				});
			}

			res.status(200).json({
				ok: true,
				user: {
					id,
					name: userName || name,
					surname,
					phone,
					email,
					createdAt,
					updatedAt,
					role,
					companyId,
					posts,
					company,
				},
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Error al recuperar el usuario, hable con el administrador',
			});
		}
	}
}
