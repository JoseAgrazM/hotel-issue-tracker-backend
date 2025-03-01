import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class roomModel {
	static async createRooms(data) {
		console.log(data);

		try {
			const newData = data.map(room => ({
				...room,
			}));

			console.log(newData);

			return await prisma.room.createMany({
				data: newData,
				skipDuplicates: true,
			});
		} catch (error) {
			console.error('Error al crear la habitación:', error);
		}
	}

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

	static async getRoomsByNames(names) {
		try {
			return await prisma.room.findMany({
				where: {
					nameRoom: {
						in: names,
					},
				},
			});
		} catch (error) {
			throw new Error(
				'Error al recuperar las habitaciones. Por favor, intente más tarde.'
			);
		}
	}

	// static async getAllRooms() {
	// 	try {
	// 		return await prisma.room.findMany({
	// 			include: {
	// 				company: true,
	// 				posts: true,
	// 			},
	// 		});
	// 	} catch (error) {
	// 		console.error('Error al recuperar la habitación:', error);
	// 	}
	// }

	static async updateRoom(column, value, data) {
		const whereClausule = { [column]: value };

		try {
			return await prisma.room.update({
				where: whereClausule,
				data: data,
			});
		} catch (error) {
			console.error('Error al recuperar la habitación:', error);
		}
	}

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
