import { Document } from 'mongoose';

export interface IToDo extends Document {
    title: string;
    owner: string;
    task: [
        {
            _id: string;
            name: string;
            description: string;
            isDone: boolean;
            dueDate: Date;
            user: string[];
        }
    ];
}
