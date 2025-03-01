/*
    Rutas de post
*/
import { Router } from 'express';
import { roomController } from '../controller/roomController.js';
import { fieldsValidate } from '../middleware/fields-validate.js';
import { check } from 'express-validator';

const roomRouter = Router();
// roomRouter.get('/', roomController.getAllRooms); //* Get all Rooms

roomRouter.post(
	'/new',
	[
		// check('id', 'El ID de la habitación es obligatorio').not().isEmpty(),
		// check('floor', 'La planta de la habitación es obligatoria')
		// 	.not()
		// 	.isEmpty(),
		// check('description', 'La descripción de la habitación es obligatoria')
		// 	.not()
		// 	.isEmpty(),
		// check('companyId', 'El id de la empresa es obligatorio')
		// 	.not()
		// 	.isEmpty(),
		fieldsValidate,
	],
	roomController.newRoom
); //* Create Rooms

roomRouter.get('/:companyId/:roomId', roomController.getRoom); //* Get Room

roomRouter.patch('/:id', roomController.updateRoom); //* Update Room patch little change

roomRouter.put(
	'/:id',
	[
		check('description', 'La descripción de la habitación es obligatoria'),
		fieldsValidate,
	],
	roomController.updateRoom
); //* Update Room PUT haciendo el cambio pasando todo el cuerpo

roomRouter.delete('/:id', roomController.deleterRoom); //* Delete Room

roomRouter.get('/:companyId', roomController.getRoomsFromCompany);

export default roomRouter;
