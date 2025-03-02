import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class roomModel {
	// Crear habitaciones en un array, para crear una o varias
	static async createRooms(data) {
		try {
			const newData = data.map(room => ({
				...room,
			}));

			return await prisma.room.createMany({
				data: newData,
				skipDuplicates: true,
			});
		} catch (error) {
			console.error('Error al crear la habitación:', error);
		}
	}

	// Recuperar una habitación por la columna de la base de datos y su valor
	static async getRoom(column, value) {
		try {
			const whereClausule = { [column]: value };

			return await prisma.room.findMany({
				where: whereClausule,
				include: {
					company: true,
					posts: true,
				},
			});
		} catch (error) {
			console.error('Error al recuperar la habitación:', error);
		}
	}

	// Actualizar una habitación
	static async updateRoom(column, value, data) {
		const whereClausule = { [column]: value };

		const { floor, nameRoom, roomState, description, companyId, typeRoom } =
			data;

		try {
			return await prisma.room.update({
				where: whereClausule,
				data: {
					floor,
					nameRoom,
					roomState,
					description,
					companyId,
					typeRoom,
				},
			});
		} catch (error) {
			console.error('Error al recuperar la habitación:', error);
		}
	}

	// Eliminar una habitacón
	static async deleteRoom(column, value) {
		const whereClausule = { [column]: value };

		try {
			return await prisma.room.delete({
				where: whereClausule,
			});
		} catch (error) {
			console.error('Error al recuperar la habitación:', error);
		}
	}

	// Recuperar las habitaciones de una empresa pasando el id de dicha empresa
	static async getRoomFromCompany(companyId, nameRoom) {
		try {
			return await prisma.room.findFirst({
				where: {
					companyId: companyId,
					nameRoom: nameRoom,
				},
				include: {
					company: true,
					posts: true,
				},
			});
		} catch (error) {
			console.error('Error al recuperar la habitación.', error);
			throw new Error(
				'Error al recuperar la habitación. Por favor, intente más tarde.'
			);
		}
	}
}
