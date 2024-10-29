import { Document, Types } from 'mongoose';

export interface IUser extends Document {
    name: string;
    firstname: string;
    email: string;
    task: Types.ObjectId[];
    salt: string;
    hash: string;
}
