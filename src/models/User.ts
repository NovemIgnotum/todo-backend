import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/User';
import { string } from 'joi';

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    name: { type: String, required: true },
    firstname: { type: String, required: true },
    salt: { type: String, required: true },
    hash: { type: String, required: true },
    task: [{ type: String }]
});

const User = model<IUser>('User', userSchema);
export default User;
