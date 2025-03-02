/*
    Rutas de post
*/
import { Router } from 'express';
import { check } from 'express-validator';
import { postController } from '../controller/postController.js';
import { fieldsValidate, validateJWT } from '../middleware/index.js';

const postRouter = Router();

postRouter.use(validateJWT);

postRouter.get('/:id', postController.getPostById); // Select post from id

postRouter.delete('/:id', postController.deletePost); // Select post from id

postRouter.post(
	'/new',
	[
		check('namePost', 'El nombre del post es Obligatorio').not().isEmpty(),
		check('companyId', 'La empresa es obligatoria').not().isEmpty(),
		check('description', 'La descripción del post es obligatoria')
			.not()
			.isEmpty(),
		check('nameRoomId', 'El numero de la habitación es obligatorio')
			.not()
			.isEmpty(),
		check('authorId', 'El authorId debe ser una cadena')
			.optional()
			.isString(),
		check('authorAdminId', 'El authorAdminId debe ser una cadena')
			.optional()
			.isString(),
		fieldsValidate,
	],
	postController.newPost
); // Create a new post

postRouter.patch(
	'/edit-post/:id',
	[
		check('namePost', 'El nombre del post es obligatorio').not().isEmpty(),
		check('companyId', 'La empresa es obligatoria').not().isEmpty(),
		check('description', 'La descripción del post es obligatoria')
			.not()
			.isEmpty(),
		check('nameRoomId', 'El numero de la habitación es obligatorio')
			.not()
			.isEmpty(),
		check('authorId', 'El authorId debe ser una cadena').optional(),
		check(
			'authorAdminId',
			'El authorAdminId debe ser una cadena'
		).optional(),
		fieldsValidate,
	],
	postController.updatePost
);

// Update post

postRouter.get('/company/:companyId', postController.getPostFromCompany);

export default postRouter;
