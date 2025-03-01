import { request, response } from 'express';
import { postModel } from '../model/postModel.js';
import { roomModel } from '../model/roomModel.js';
import { userModel } from '../model/userModel.js';
// import { companyController } from './companyController.js';
import { companyModel } from '../model/companyModel.js';
import { header } from 'express-validator';

export class postController {
	static async newPost(req = request, res = response) {
		const data = req.body;

		try {
			const existCompany = await companyModel.getCompany(
				'id',
				data.companyId
			);

			if (!existCompany) {
				return res.status(404).json({
					ok: false,
					msg: 'La empresa no existe',
				});
			}

			const existRoomsInCompany = await companyModel.companyWithRooms(
				data.companyId
			);

			const namesRooms = existRoomsInCompany.rooms.map(
				room => room.nameRoom
			);

			if (!namesRooms.includes(data.nameRoomId)) {
				return res.status(404).json({
					ok: false,
					msg: `La habitación ${data.nameRoomId} no existe en la empresa.`,
				});
			}

			const isUser = await userModel.getUser('id', data.authorId);

			const isAdmin = await userModel.getAdmin('id', data.authorAdminId);

			if (!isUser && !isAdmin) {
				return res.status(404).json({
					ok: false,
					msg: 'El autor no existe',
				});
			}

			if (isUser) {
				const postUser = await postModel.newPost(data);

				return res.status(201).json({
					ok: true,
					postUser,
					msg: 'El usuario a creado el post con exito!',
				});
			}

			const postAdmin = await postModel.newPost(data);

			res.status(201).json({
				ok: true,
				postAdmin,
				msg: 'El Admin a creado el post con exito!',
			});
		} catch (error) {
			console.error('Error al crear el post:', error);
			res.status(500).json({
				ok: false,
				msg: 'Hubo un error al crear el post, hable con el administrador.',
			});
		}
	}

	static async getPostById(req = request, res = response) {
		const { id } = req.params;

		try {
			const post = await postModel.getPost('id', id);

			if (!post) {
				return res.status(404).json({
					ok: false,
					msg: 'El post no existe',
				});
			}

			res.status(201).json({
				ok: true,
				post,
			});
		} catch (error) {
			console.error(error);
		}
	}

	static async updatePost(req = request, res = response) {
		const { id } = req.params;
		const updatedPost = req.body;

		const numberId = parseInt(id);

		try {
			const existPost = await postModel.getPost('id', numberId);

			if (!existPost) {
				return res.status(404).json({
					ok: false,
					msg: 'No existe el post',
				});
			}

			const existRoom = await roomModel.getRoom(
				'nameRoom',
				updatedPost.nameRoomId
			);

			if (existRoom < 1) {
				return res.status(404).json({
					ok: false,
					msg: 'No existe la habitación',
				});
			}

			const newPost = await postModel.updatePost(numberId, updatedPost);

			res.status(200).json({
				ok: true,
				newPost,
				msg: 'Post actualizado con exito',
			});
		} catch (error) {
			res.status(500).json({
				ok: false,
				msg: 'Error al editar el post, hable con el administrador',
			});
		}
	}

	static async deletePost(req = request, res = response) {
		const { id } = req.params;
		try {
			const post = await postModel.getPost('id', id);

			if (!post) {
				return res.status(404).json({
					ok: true,
					msg: 'El post no existe',
				});
			}

			const postDelete = await postModel.deletePost(id);

			res.status(200).json({
				ok: true,
				postDelete,
				msg: 'El post se elimino con exito!',
			});
		} catch (error) {
			console.error(error);
		}
	}

	static async getPostFromCompany(req, res) {
		const { companyId } = req.params;

		try {
			const existCompany = await companyModel.getCompany('id', companyId);

			if (!existCompany) {
				return res.status(404).json({
					ok: false,
					msg: 'La empresa no existe',
				});
			}

			const { posts } = await companyModel.companyWithPosts(companyId);

			res.status(200).json({
				ok: true,
				posts,
				msg: 'Los posts de la compañia recuperados con exito!',
			});
		} catch (error) {
			console.error(error);
		}
	}
}
