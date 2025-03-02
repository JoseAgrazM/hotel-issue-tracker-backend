import { request, response } from 'express';
import { userModel } from '../model/userModel.js';
import { companyModel } from '../model/companyModel.js';

export class companyController {
	//Todo: Para crear la empresa antes necesito el id del superAdmin que la va a crear para asociarse
	static async createCompany(req = request, res = response) {
		const data = req.body;

		const { companyName, superAdminId, phoneCompany } = data;

		try {
			const superAdmin = await userModel.getUserAndAdmin(
				'id',
				superAdminId
			);

			if (!superAdmin) {
				return res.status(500).json({
					ok: false,
					msg: 'El admin no existe',
				});
			}

			let company = await companyModel.getCompany(
				'companyName',
				companyName
			);

			if (company) {
				return res.status(500).json({
					ok: false,
					msg: 'El nombre de la empresa ya existe',
				});
			}
			const existPhone = await companyModel.getCompany(
				'phoneCompany',
				phoneCompany
			);

			if (existPhone) {
				return res.status(400).json({
					ok: false,
					msg: `El numero de telefono de la empresa ya existe`,
				});
			}

			company = await companyModel.createCompany(data);

			res.status(201).json({
				ok: true,
				company,
				msg: 'Se crearon las habitaciones con exito',
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Error al crear la empresa, Hable con el administrador',
			});
		}
	}

	static async getAllCompanies(req, res = response) {
		try {
			const companies = await companyModel.getAllCompany();

			return res.status(200).json({
				ok: true,
				companies,
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Error al devolver las empresas, Hable con el administrador',
			});
		}
	}

	static async getCompanyId(req = request, res = response) {
		const { id } = req.params;
		try {
			const company = await companyModel.getCompany('id', id);

			if (!company) {
				return res.status(404).json({
					ok: false,
					msg: 'La empresa no existe',
				});
			}

			res.status(200).json({
				ok: true,
				company,
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Error al devolver la empresa, Hable con el administrador',
			});
		}
	}

	static async getCompaniesFromAdmin(req = request, res = response) {
		const { idAdmin } = req.params;
		try {
			const user = await userModel.getUserAndAdmin('id', idAdmin);
			if (!user) {
				return res.status(400).json({
					ok: false,
					msg: `El admin no existe`,
				});
			}

			const companies = await companyModel.getCompaniesFromAdminId(
				'superAdminId',
				idAdmin
			);

			res.status(200).json({
				ok: true,
				companies,
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Error al devolver la empresa, Hable con el administrador',
			});
		}
	}

	static async deleteCompany(req = request, res = response) {
		const { id } = req.params;

		let company = await companyModel.getCompany('id', id);

		if (!company) {
			return res.status(404).json({
				ok: false,
				msg: 'La empresa no existe',
			});
		}

		company = await companyModel.deleteCompany(id);

		res.status(200).json({
			ok: true,
			company,
			msg: 'La empresa se elimino con exito.',
		});
	}

	static async editCompany(req, res) {
		const { id } = req.params;
		const data = req.body;

		const { companyName, superAdminId, phoneCompany } = data;

		let updatedCompany = { companyName, superAdminId, phoneCompany };

		try {
			const company = await companyModel.getCompany('id', id);

			if (!company) {
				return res.status(404).json({
					ok: false,
					msg: 'No existe el usuario',
				});
			}

			if (company.superAdminId !== superAdminId) {
				return res.status(404).json({
					ok: false,
					msg: 'Este superadmin no es de esta empresa',
				});
			}

			const existPhone = await companyModel.getCompany(
				'phoneCompany',
				phoneCompany
			);

			if (existPhone && existPhone.id !== id) {
				return res.status(404).json({
					ok: false,
					msg: 'Este telefono ya existe',
				});
			}

			const existName = await companyModel.getCompany(
				'companyName',
				companyName
			);

			if (existName && existName.id !== id) {
				return res.status(404).json({
					ok: false,
					msg: 'Este nombre de empresa ya existe',
				});
			}

			updatedCompany = await companyModel.editCompany(id, data);

			res.status(200).json({
				ok: true,
				updatedCompany,
				msg: 'Empresa actualizada con exito',
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Error al editar el usuario, hable con el administrador',
			});
		}
	}
}
