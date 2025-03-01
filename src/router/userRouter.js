/*
    Rutas de usuario
*/
import { Router } from 'express';
import { check } from 'express-validator';
import { userController } from '../controller/userController.js';
import { fieldsValidate } from '../middleware/fields-validate.js';
import { validateJWT } from '../middleware/jwt-validate.js';

const userRouter = Router();

//* Registro admin
userRouter.post(
	'/new-admin',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('surname', 'El apellido es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check(
			'password',
			'El password es debe de ser de 6 caracteres'
		).isLength({ min: 6 }),
		check('phone', 'El telefono es obligatorio y debe tener 9 digitos')
			.isLength({ min: 9 })
			.matches(/^\d+$/),
		fieldsValidate,
	],
	userController.createAdmin
);

//* Registro user
userRouter.post(
	'/new',
	[
		check('userName', 'El nombre es obligatorio').not().isEmpty(),
		check('surname', 'El apellido es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check(
			'password',
			'El password es debe de ser de 6 caracteres'
		).isLength({ min: 6 }),
		check('companyId', 'El id de la empresa es obligatorio')
			.not()
			.isEmpty(),
		check('phone', 'El telefono es obligatorio y debe tener 9 digitos')
			.isLength({ min: 9 })
			.matches(/^\d+$/),
		fieldsValidate,
	],
	userController.createUser
);

//* Login user and Admin
userRouter.post(
	'/login',
	[
		check('email', 'El email es obligatorio').isEmail(),
		check(
			'password',
			'El password es debe de ser de 6 caracteres'
		).isLength({
			min: 6,
		}),
	],
	userController.loginUser
);

userRouter.delete('/:id', userController.deleteUser);

userRouter.get('/user/:id', userController.getUserId);

userRouter.patch(
	'/edit-user/:id',
	[
		check('userName', 'El nombre es obligatorio').not().isEmpty(),
		check('surname', 'El apellido es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check('companyId', 'El id de la empresa es obligatorio')
			.not()
			.isEmpty(),
		check('phone', 'El telefono es obligatorio y debe tener 9 digitos')
			.isLength({ min: 9 })
			.matches(/^\d+$/),
		fieldsValidate,
	],
	userController.editUser
);

userRouter.patch(
	'/edit-admin/:id',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('surname', 'El apellido es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check('phone', 'El telefono es obligatorio y debe tener 9 digitos')
			.isLength({ min: 9 })
			.matches(/^\d+$/),
		fieldsValidate,
	],
	userController.editAdmin
);

userRouter.get('/company/:idCompany', userController.getUsersFromCompany);

//! RENEW Token
userRouter.get('/renew', validateJWT, userController.renewToken);

export default userRouter;
