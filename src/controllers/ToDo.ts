import { Request, Response } from 'express';
import ToDo from '../models/ToDo';
import User from '../models/User';

const createToDo = async (req: Request, res: Response) => {
    try {
        const { title, owner } = req.body;
        if (!title || !owner) {
            return res.status(400).json({ error: ' missing parameter' });
        }
        const findedUser = await User.findById(owner);
        if (!findedUser) {
            return res.status(400).json({ error: 'User not found' });
        }

        const newToDo = new ToDo({
            title,
            owner
        });

        await newToDo.save();
        findedUser.task.push(newToDo._id);
        await findedUser.save();

        console.log(newToDo._id);

        return res.status(201).json(newToDo);
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

const readAllToDo = async (req: Request, res: Response) => {
    try {
        const toDos = await ToDo.find();
        return res.status(200).json(toDos);
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

const readOneToDo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const toDo = await ToDo.findById(id);
        if (!toDo) {
            return res.status(404).json({ message: 'ToDo not found' });
        }
        return res.status(200).json({ message: 'To do list finded', toDo });
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

const readAllToDoByUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const toDoOwned = await ToDo.find({ owner: id });
        const toDoParticipated = await ToDo.find({ 'task.user': id });
        return res.status(200).json({ toDoOwned, toDoParticipated });
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

const addTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { taskName, taskDescription, dueDate } = req.body;
        if (!taskName || !taskDescription || !dueDate) {
            return res.status(400).json({ error: ' missing parameter' });
        }
        const toDoFinded = await ToDo.findById(id);
        if (!toDoFinded) {
            return res.status(404).json({ message: 'ToDo not found' });
        }
        const newTask = {
            _id: new Date().getTime().toString(),
            name: taskName,
            description: taskDescription,
            isDone: false,
            dueDate: new Date(dueDate),
            user: []
        };
        toDoFinded.task.push(newTask);
        await toDoFinded.save();

        return res.status(200).json({ message: 'Task added' });
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

const modifyParticipant = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userToRemove, userToAdd, taskID } = req.body;
        const toDoFinded = await ToDo.findById(id);
        if (!toDoFinded) {
            return res.status(404).json({ message: 'ToDo not found' });
        }
        if (userToRemove) {
            const userFinded = await User.findById(userToRemove);
            if (!userFinded) {
                return res.status(404).json({ message: 'User not found' });
            }
            const taskFinded = toDoFinded.task.find((task) => task._id === taskID);
            if (!taskFinded) {
                return res.status(404).json({ message: 'Task not found' });
            }
            const userIndex = taskFinded.user.indexOf(userToRemove);
            if (userIndex === -1) {
                return res.status(404).json({ message: 'User not found in task' });
            }
            taskFinded.user.splice(userIndex, 1);
            userFinded.task.splice(userFinded.task.indexOf(toDoFinded._id), 1);

            await toDoFinded.save();
            await userFinded.save();

            return res.status(200).json({ message: 'User removed from task' });
        }
        if (userToAdd) {
            const userFinded = await User.findById(userToAdd);
            if (!userFinded) {
                return res.status(404).json({ message: 'User not found' });
            }
            const taskFinded = toDoFinded.task.find((task) => task._id === taskID);
            if (!taskFinded) {
                return res.status(404).json({ message: 'Task not found' });
            }
            const userIndex = taskFinded.user.indexOf(userToAdd);
            if (userIndex !== -1) {
                return res.status(404).json({ message: 'User already in task' });
            }
            taskFinded.user.push(userToAdd);
            userFinded.task.push(toDoFinded._id);

            await toDoFinded.save();
            await userFinded.save();
            return res.status(200).json({ message: 'User added to task' });
        }

        if (!userToRemove && !userToAdd) {
            return res.status(400).json({ message: 'Missing parameter' });
        }
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

const changeOwner = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { newOwner } = req.body;
        const toDoFinded = await ToDo.findById(id);
        if (!toDoFinded) {
            return res.status(404).json({ message: 'ToDo not found' });
        }
        const userFinded = await User.findById(newOwner);
        if (!userFinded) {
            return res.status(404).json({ message: 'User not found' });
        }
        toDoFinded.owner = newOwner;
        const oldOwner = await User.findById(toDoFinded.owner);
        if (!oldOwner) {
            return res.status(404).json({ message: 'Old owner not found' });
        }
        oldOwner.task.splice(oldOwner.task.indexOf(toDoFinded._id), 1);
        console.log(toDoFinded);
        await toDoFinded.save();
        await oldOwner.save();
        return res.status(200).json({ message: 'Owner changed' });
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

export default { createToDo, readAllToDo, readOneToDo, addTask, modifyParticipant, readAllToDoByUser, changeOwner };
