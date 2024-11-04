import controller from '../controllers/ToDo';
import express from 'express';

const router = express.Router();

router.post('/Create/', controller.createToDo);
router.get('/ReadAll/', controller.readAllToDo);
router.get('/ReadOne/:id', controller.readOneToDo);
router.get('/ReadAllByUser/:id', controller.readAllToDoByUser);
router.put('/AddTask/:id', controller.addTask);
router.put('/modifyParticipant/:id', controller.modifyParticipant);
router.put('/updateTask/:id', controller.updateTodo);

export default router;
