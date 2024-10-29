import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.post('/Create/', controller.createUser);
router.get('/ReadAll/', controller.readAllUser);
router.get('/ReadOne/:id', controller.readOneUser);
router.patch('/Update/:id', controller.updateUser);

export default router;
