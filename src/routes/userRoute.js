import { Router } from 'express';

import * as userController from '../controller/userController.js';

const router = Router();

/*
*----------Routes Section------------
*/
router.post('/v1/add-new-user', userController.addNewUser);
router.get('/v1/get-all-user', userController.getAllUser);

router.post('/v1/add-new-address', userController.addNewAddress);
router.get('/v1/get-all-address', userController.getAllAddress);

router.post('/v1/add-new-category', userController.addNewCategory);
router.get('/v1/get-all-category', userController.getAllCategory);
/*
*-----------------------------
*/
export default router;
