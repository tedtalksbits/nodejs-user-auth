import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Users from '../model/Users.js';
dotenv.config();

export const login = async (req, res) => {
    let { username, password } = req.body;
    const user = Users.findUserByUsername(username);
    if (!(username && password)) {
        res.status(400).json({ message: 'Please fill in all fields' });
        return;
    }
    if (!user) {
        res.status(400).json({ message: 'User not found' });
        return;
    }

    try {
        const token = jwt.sign({ username }, process.env.JWT_SECRET);
        user.token = token;

        // using crypto to compare the passwords
        // let [salt, hash] = user.password.split('$');

        // let newHash = crypto
        //     .createHmac('sha512', salt)
        //     .update(password)
        //     .digest('base64');
        // if (hash === newHash) {
        //     res.status(200).json({
        //         message: 'User logged in',
        //         status: 200,
        //         user,
        //     });
        // } else {
        //     return res.status(400).json({ message: 'Wrong password' });
        // }

        // using bcrypt to compare the passwords
        if (bcrypt.compareSync(password, user.password)) {
            res.status(200).json({
                message: 'User logged in',
                status: 200,
                user,
            });
        } else {
            return res.status(400).json({ message: 'Wrong password' });
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

export const register = async (req, res) => {
    let { username, password } = req.body;

    //using crypto to hash the password
    // let salt = crypto.randomBytes(16).toString('base64');
    // let hash = crypto
    //     .createHmac('sha512', salt)
    //     .update(password)
    //     .digest('base64');
    // password = salt + '$' + hash;

    // using bcrypt to hash the password
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    password = hash;

    const isCurrentUser = Users.findUserByUsername(username);
    if (isCurrentUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }
    if (!username || !password) {
        res.status(400).json({ message: 'Please fill in all fields' });
    }

    if (username && password) {
        try {
            const token = jwt.sign({ username }, process.env.JWT_SECRET);
            const user = Users.insertOneUser({ username, password, token });
            res.status(201).json({
                message: 'User created',
                status: 201,
                user,
            });
            return;
        } catch (err) {
            console.log('error: ', err);
            res.status(500).send(err);
        }
    }
};
