import { request, response } from 'express';
import { roomModel } from '../model/roomModel.js';
import { companyModel } from '../model/companyModel.js';

export class roomController {
	static async newRoom(req = request, res = response) {
		const data = req.body;

		//! Las habitaciones sea 1 o mas tienen que venir en un array de objetos

		try {
			const companyIds = data.map(company => company.companyId);

			const existingCompanies = await companyModel.getCompaniesByIds(
				companyIds
			);

			if (existingCompanies.length < 1) {
				return res.status(400).json({
					ok: false,
					msg: `La Empresa no existe`,
				});
			}

			const roomNames = data.map(room => room.nameRoom);

			const existRoomsInCompany = await companyModel.companyWithRooms(
				companyIds[0]
			);

			const namesRooms = existRoomsInCompany.rooms.map(
				room => room.nameRoom
			);

			const existingRoomName = roomNames.find(room =>
				namesRooms.includes(room)
			);

			if (existingRoomName) {
				return res.status(400).json({
					ok: false,
					msg: `La habitación ${existingRoomName} ya existe`,
				});
			}

			const rooms = await roomModel.createRooms(data);

			if (rooms.count === 1) {
				res.status(201).json({
					ok: true,
					rooms,
					msg: 'Habitación creada con exito!',
				});
				return;
			}

			res.status(201).json({
				ok: true,
				rooms,
				msg: 'Habitaciones creadas con exito!',
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Hubo un error al crear la habitación hable con el administrador',
			});
		}
	}

	static async getRoom(req = request, res = response) {
		const { roomId, companyId } = req.params;

		try {
			const company = await companyModel.getCompany('id', companyId);

			if (!company) {
				return res.status(404).json({
					ok: false,
					msg: `La empresa no existe`,
				});
			}

			const room = await roomModel.getRoomFromCompany(companyId, roomId);

			if (room.length < 1) {
				return res.status(404).json({
					ok: false,
					msg: `La habitación no existe`,
				});
			}

			res.status(200).json({
				ok: true,
				room,
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Hubo un error al recuperar las habitaciones',
			});
		}
	}

	static async updateRoom(req = request, res = response) {
		const { room } = req.body;

		const states = {
			AVAILABLE: 'AVAILABLE',
			OCCUPIED: 'OCCUPIED',
			BLOCKED: 'BLOCKED',
		};

		try {
			const existCompany = await companyModel.getCompany(
				'id',
				room.companyId
			);

			if (!existCompany) {
				return res.status(404).json({
					ok: false,
					msg: 'La empresa no existe',
				});
			}

			if (!Object.values(states).includes(room.roomState)) {
				return res.status(400).json({
					ok: false,
					msg: 'El estado no es válido',
				});
			}

			const existRoom = await roomModel.getRoom('id', room.id);

			if (!existRoom || existRoom.length < 1) {
				return res.status(404).json({
					ok: false,
					msg: `La habitación no existe`,
				});
			}

			const updatedRoom = await roomModel.updateRoom('id', room.id, room);

			res.status(200).json({
				ok: true,
				updatedRoom,
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Hubo un error al actualizar la habitación, hable con el administrador',
			});
		}
	}

	static async getRoomsFromCompany(req = request, res = response) {
		const { companyId } = req.params;

		try {
			const existCompany = await companyModel.getCompany('id', companyId);

			if (!existCompany) {
				return res.status(404).json({
					ok: false,
					msg: 'La empresa no existe',
				});
			}

			const { rooms } = await companyModel.companyWithRooms(companyId);

			res.status(200).json({
				ok: true,
				rooms,
				msg: 'Los habitaciones recuperadas con exito!',
			});
		} catch (error) {
			console.error(error);
		}
	}

	//! ########   NO PUEDO ELIMINAR UNA HABITACIÓN SI NO SOY SUPERADMIN   ##########
	static async deleterRoom(req = request, res = response) {
		const { id } = req.params;

		try {
			let roomDelete = await roomModel.getRoom('id', parseInt(id));

			if (roomDelete.length < 1) {
				return res.status(404).json({
					ok: false,
					msg: `La habitación no existe`,
				});
			}

			roomDelete = await roomModel.deleteRoom('id', parseInt(id));

			res.status(200).json({
				ok: true,
				roomDelete,
				msg: 'Habitación eliminada con exito!',
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Hubo un error al eliminar la habitación, hable con el administrador',
			});
		}
	}
}
