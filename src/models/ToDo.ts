import { Schema, model } from 'mongoose';
import { IToDo } from '../interfaces/ToDo';

const toDoSchema = new Schema<IToDo>({
    title: { type: String, required: true },
    owner: { type: String, required: true },
    task: [
        {
            _id: { type: String, required: false },
            name: { type: String, required: false },
            description: { type: String, required: false },
            isDone: { type: Boolean, required: false },
            dueDate: { type: Date, required: false },
            user: { type: [String], required: false }
        }
    ]
});

const ToDo = model<IToDo>('ToDo', toDoSchema);
export default ToDo;
