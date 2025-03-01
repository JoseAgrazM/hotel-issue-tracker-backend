import { Router } from 'express';
import { check } from 'express-validator';
import { companyController } from '../controller/companyController.js';
import { fieldsValidate } from '../middleware/fields-validate.js';

const companyRouter = Router();

companyRouter.post(
	'/new',
	[
		check('companyName', 'El nombre de la empresa es obligatorio')
			.not()
			.isEmpty(),
		check('addressCompany', 'La dirección de la empresa es obligatorio')
			.not()
			.isEmpty(),
		check('city', 'La ciudad de la empresa es obligatorio').not().isEmpty(),
		check('country', 'El pais de la empresa es obligatorio')
			.not()
			.isEmpty(),
		check(
			'phoneCompany',
			'El telefono de la empresa debe de tener 9 o mas digitos'
		).matches(/^\d{9,}$/),
		check('superAdminId', 'El ID del Admin es obligatorio').not().isEmpty(),
		fieldsValidate,
	],
	companyController.createCompany
);

companyRouter.get('/:id', companyController.getCompanyId);

companyRouter.get('/admin/:idAdmin', companyController.getCompaniesFromAdmin);

companyRouter.delete('/:id', companyController.deleteCompany);

companyRouter.patch('/edit-company/:id', companyController.editCompany);

export default companyRouter;
