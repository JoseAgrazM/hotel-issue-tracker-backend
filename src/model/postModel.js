import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class postModel {
	static async newPost(post) {
		try {
			return await prisma.post.create({
				data: post,
			});
		} catch (error) {
			throw new Error(
				'Error al crar el post. Por favor, intente más tarde.'
			);
		}
	}

	static async getAllPost() {
		try {
			return await prisma.post.findMany({
				include: {
					author: {
						select: {
							userName: true,
							surname: true,
							role: true,
						},
					}, //TODO:  SE REPITE MUCHO CODIGO CON LOS SELECT USERNAME SURNAME Y ROLE CREAR UN OBJETO DE ESO
					authorAdmin: {
						select: {
							name: true,
							surname: true,
							role: true,
						},
					},
					room: {
						select: {
							id: true,
							floor: true,
							nameRoom: true,
							roomState: true,
							description: true,
						},
					},
				},
			});
		} catch (error) {
			throw new Error(
				'Error al recuperar los post. Por favor, intente más tarde.'
			);
		}
	}
	static async getPost(column, value) {
		if (!value) return false;
		try {
			let whereClausule;
			if (column === 'id') {
				whereClausule = { [column]: parseInt(value) };
				return await prisma.post.findUnique({
					where: whereClausule,
					include: {
						author: {
							select: {
								userName: true,
								surname: true,
								role: true,
							},
						},
						authorAdmin: {
							select: {
								name: true,
								surname: true,
								role: true,
							},
						},
						room: {
							select: {
								floor: true,
								roomState: true,
								description: true,
							},
						},
					},
				});
			}
			whereClausule = { [column]: value };

			return await prisma.post.findMany({
				where: whereClausule,
				include: {
					author: {
						select: {
							userName: true,
							surname: true,
							role: true,
						},
					},
					authorAdmin: {
						select: {
							name: true,
							surname: true,
							role: true,
						},
					},
					room: {
						select: {
							id: true,
							floor: true,
							nameRoom: true,
							roomState: true,
							description: true,
						},
					},
				},
			});
		} catch (error) {
			throw new Error(
				'Error al recuperar el post. Por favor, intente más tarde.'
			);
		}
	}
	static async updatePost(id, post) {
		try {
			return await prisma.post.update({
				where: {
					id: id,
				},
				data: {
					...post,
					updatedAt: new Date(),
				},
			});
		} catch (error) {
			throw new Error(
				'Error al actualizar. Por favor, intente más tarde.'
			);
		}
	}

	static async deletePost(id) {
		try {
			return await prisma.post.delete({
				where: { id: parseInt(id) },
			});
		} catch (error) {
			throw new Error(
				'Error al actualizar. Por favor, intente más tarde.'
			);
		}
	}
}
