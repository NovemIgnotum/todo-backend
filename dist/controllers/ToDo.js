"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ToDo_1 = __importDefault(require("../models/ToDo"));
const User_1 = __importDefault(require("../models/User"));
const createToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, owner } = req.body;
        if (!title || !owner) {
            return res.status(400).json({ error: ' missing parameter' });
        }
        const findedUser = yield User_1.default.findById(owner);
        if (!findedUser) {
            return res.status(400).json({ error: 'User not found' });
        }
        const newToDo = new ToDo_1.default({
            title,
            owner
        });
        yield newToDo.save();
        findedUser.task.push(newToDo._id);
        yield findedUser.save();
        return res.status(201).json(newToDo);
    }
    catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
});
const readAllToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const toDos = yield ToDo_1.default.find();
        return res.status(200).json(toDos);
    }
    catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
});
const readOneToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const toDo = yield ToDo_1.default.findById(id);
        if (!toDo) {
            return res.status(404).json({ message: 'ToDo not found' });
        }
        return res.status(200).json({ message: 'To do list finded', toDo });
    }
    catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
});
const readAllToDoByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const toDoOwned = yield ToDo_1.default.find({ owner: id });
        const toDoParticipated = yield ToDo_1.default.find({ 'task.user': id });
        return res.status(200).json({ toDoOwned, toDoParticipated });
    }
    catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
});
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { taskName, taskDescription, dueDate } = req.body;
        if (!taskName || !taskDescription || !dueDate) {
            return res.status(400).json({ error: ' missing parameter' });
        }
        const toDoFinded = yield ToDo_1.default.findById(id);
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
        yield toDoFinded.save();
        return res.status(200).json({ message: 'Task added' });
    }
    catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
});
const modifyParticipant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userToRemove, userToAdd, taskID } = req.body;
        const toDoFinded = yield ToDo_1.default.findById(id);
        if (!toDoFinded) {
            return res.status(404).json({ message: 'ToDo not found' });
        }
        if (userToRemove) {
            const userFinded = yield User_1.default.findById(userToRemove);
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
            yield toDoFinded.save();
            yield userFinded.save();
            return res.status(200).json({ message: 'User removed from task' });
        }
        if (userToAdd) {
            const userFinded = yield User_1.default.findById(userToAdd);
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
            yield toDoFinded.save();
            yield userFinded.save();
            return res.status(200).json({ message: 'User added to task' });
        }
        if (!userToRemove && !userToAdd) {
            return res.status(400).json({ message: 'Missing parameter' });
        }
    }
    catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
});
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { todoTitle, newOwner, tasks } = req.body;
        const toDoFinded = yield ToDo_1.default.findById(id);
        if (!toDoFinded) {
            return res.status(404).json({ message: 'ToDo not found' });
        }
        if (tasks) {
            tasks.forEach((task) => __awaiter(void 0, void 0, void 0, function* () {
                const taskFinded = toDoFinded.task.find((task) => task._id === Object(task).taskID);
                if (!taskFinded) {
                    return res.status(404).json({ message: `the ${Object(task).taskID} does not exist` });
                }
                else {
                    if (Object(task).taskName) {
                        taskFinded.name = Object(task).taskName;
                    }
                    if (Object(task).taskDescription) {
                        taskFinded.description = Object(task).taskDescription;
                    }
                    if (Object(task).dueDate) {
                        taskFinded.dueDate = Object(task).dueDate;
                    }
                    if (Object(task).userToAdd) {
                        const userFinded = yield User_1.default.findById(Object(task).userToAdd);
                        if (!userFinded) {
                            return res.status(404).json({ message: 'User not found' });
                        }
                        const userIndex = taskFinded.user.indexOf(Object(task).userToAdd);
                        if (userIndex !== -1) {
                            return res.status(404).json({ message: 'User already in task' });
                        }
                        taskFinded.user.push(Object(task).userToAdd);
                        userFinded.task.push(toDoFinded._id);
                        yield userFinded.save();
                    }
                    if (Object(task).userToRemove) {
                        const userFinded = yield User_1.default.findById(Object(task).userToRemove);
                        if (!userFinded) {
                            return res.status(404).json({ message: 'User not found' });
                        }
                        const userIndex = taskFinded.user.indexOf(Object(task).userToRemove);
                        if (userIndex === -1) {
                            return res.status(404).json({ message: 'User not found in task' });
                        }
                        taskFinded.user.splice(userIndex, 1);
                        userFinded.task.splice(userFinded.task.indexOf(toDoFinded._id), 1);
                        yield userFinded.save();
                    }
                }
            }));
        }
        if (todoTitle) {
            toDoFinded.title = todoTitle;
        }
        if (newOwner) {
            const userFinded = yield User_1.default.findById(newOwner);
            if (!userFinded) {
                return res.status(404).json({ message: 'User not found' });
            }
            toDoFinded.owner = newOwner;
            const oldOwner = yield User_1.default.findById(toDoFinded.owner);
            if (!oldOwner) {
                return res.status(404).json({ message: 'Old owner not found' });
            }
            oldOwner.task.splice(oldOwner.task.indexOf(toDoFinded._id), 1);
            console.log(toDoFinded);
            yield toDoFinded.save();
            yield oldOwner.save();
        }
        return res.status(200).json({ message: 'Task updated' });
    }
    catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
});
exports.default = {
    createToDo,
    readAllToDo,
    readOneToDo,
    addTask,
    modifyParticipant,
    readAllToDoByUser,
    updateTodo
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9Eby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9Ub0RvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMERBQWtDO0FBQ2xDLDBEQUFrQztBQUVsQyxNQUFNLFVBQVUsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUNyRCxJQUFJLENBQUM7UUFDRCxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25CLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFDRCxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVELE1BQU0sT0FBTyxHQUFHLElBQUksY0FBSSxDQUFDO1lBQ3JCLEtBQUs7WUFDTCxLQUFLO1NBQ1IsQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXhCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFD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