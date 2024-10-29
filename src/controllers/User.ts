import { Request, Response } from 'express';
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');
import User from '../models/User';

const createUser = async (req: Request, res: Response) => {
    try {
        const { email, name, firstname, password } = req.body;
        if (!email || !name || !firstname || !password) {
            return res.status(400).json({ message: 'Missing parameters' });
        }

        if (await User.findOne({ email })) {
            return res.status(400).json('Email already used');
        }

        const salt: string = uid2(26);
        const hash: string = SHA256(password + salt).toString(encBase64);
        const newUser = new User({
            name,
            firstname,
            email,
            salt,
            hash
        });

        await newUser.save();

        return res.status(201).json({ message: 'user created', newUser });
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

const readAllUser = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

const readOneUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { email, name, firstname, password } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email && email !== user.email && (await User.findOne({ email }))) {
            return res.status(400).json('Email already used');
        }

        if (email) user.email = email;
        if (name) user.name = name;
        if (firstname) user.firstname = firstname;
        if (password) {
            const salt: string = uid2(26);
            const hash: string = SHA256(password + salt).toString(encBase64);
            user.salt = salt;
            user.hash = hash;
        }

        await user.save();

        return res.status(200).json({ message: 'User updated', user });
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

export default { createUser, readAllUser, readOneUser, updateUser };
