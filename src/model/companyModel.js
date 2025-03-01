import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class companyModel {
	static async createCompany(data) {
		try {
			//todo: Crear compañia añadir el id del super admin si existe y si esta logeado, sino no se creará
			return await prisma.company.create({
				data: data,
			});
		} catch (error) {
			console.error('Error al crear la empresa:', error);
		}
	}

	static async getCompany(column, value) {
		const whereCondition = { [column]: value };

		try {
			return await prisma.company.findUnique({
				where: whereCondition,
				include: {
					rooms: true,
					posts: true,
					users: {
						select: {
							id: true,
							userName: true,
							surname: true,
							phone: true,
							email: true,
							createdAt: true,
							updatedAt: true,
							role: true,
						},
					},
				},
			});
		} catch (error) {
			console.error('Error al seleccionar la empresa:', error);
		}
	}

	static async getCompaniesByIds(IDs) {
		try {
			return await prisma.company.findMany({
				where: {
					id: {
						in: IDs,
					},
				},
			});
		} catch (error) {
			console.error('Error al recuperar la empresa:', error);
			throw new Error(
				'Error al recuperar las empresas. Por favor, intente más tarde.'
			);
		}
	}

	// Recupero todas las compañias que tenga asociada al superAdmin

	static async getCompaniesFromAdminId(column, value) {
		if (!value) return false;

		try {
			const whereClausule = { [column]: value };

			return await prisma.company.findMany({
				where: whereClausule,
				include: {
					rooms: {
						include: { posts: true },
					},
					posts: true,
					users: {
						select: {
							id: true,
							userName: true,
							surname: true,
							phone: true,
							email: true,
							createdAt: true,
							updatedAt: true,
							role: true,
							posts: true,
						},
					},
				},
			});
		} catch (error) {
			console.error('Error al recuperar el user:', error);
		}
	}

	// Recupero todos los post de una compañia
	static async companyWithPosts(id) {
		try {
			return await prisma.company.findUnique({
				where: {
					id: id,
				},
				select: {
					posts: true,
				},
			});
		} catch (error) {
			throw new Error(
				'Error al actualizar. Por favor, intente más tarde.'
			);
		}
	}

	//Recupero todas las habitaciones de una compañía
	static async companyWithRooms(id) {
		try {
			return await prisma.company.findUnique({
				where: {
					id: id,
				},
				select: {
					rooms: true,
				},
			});
		} catch (error) {
			throw new Error(
				'Error al actualizar. Por favor, intente más tarde.'
			);
		}
	}

	static async deleteCompany(id) {
		try {
			return await prisma.company.delete({
				where: { id: id },
			});
		} catch (error) {
			throw new Error(
				'Error al eliminar la empresa. Por favor, intente más tarde.'
			);
		}
	}
}
