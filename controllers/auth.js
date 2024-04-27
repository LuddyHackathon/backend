import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as fs from 'fs';

import User from '../models/user.js';

const signup = (req, res, next) => {
    // checks if email already exists
    User.findOne({
        where: {
            email: req.body.email,
        }
    })
        .then(dbUser => {
            if (dbUser) {
                return res.status(409).json({ message: 'Email already exists' });
            } else if (req.body.email && req.body.password) {
                // password hash
                bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                    if (err) {
                        return res.status(500).json({ message: err.message });
                    } else if (passwordHash) {
                        return User.create(({
                            email: req.body.email,
                            name: req.body.name,
                            password: passwordHash,
                        }))
                            .then(() => {
                                res.status(200).json({ message: 'User created' });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(502).json({ message: 'Error while creating the user' });
                            });
                    };
                });
            } else if (!req.body.password) {
                return res.status(400).json({ message: 'Password not provided' });
            } else if (!req.body.email) {
                return res.status(400).json({ message: 'Email not provided' });
            };
        })
        .catch(err => {
            console.log('error', err);
        });
};

const login = (req, res, next) => {
    // checks if email exists
    User.findOne({
        where: {
            email: req.body.email,
        }
    })
        .then(dbUser => {
            if (!dbUser) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                // password hash
                bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                    if (err) { // error while comparing
                        res.status(502).json({ message: 'Error while checking user password' });
                    } else if (compareRes) { // password match
                        let privateKey = fs.readFileSync('/home/node/backend/privatekey.pem');
                        const token = jwt.sign({ email: req.body.email }, privateKey, { algorithm: 'RS512', expiresIn: '1h' });
                        res.status(200).json({ message: 'User logged in', 'token': token });
                    } else { // password doesnt match
                        res.status(401).json({ message: 'Invalid credentials' });
                    };
                });
            };
        })
        .catch(err => {
            console.log('error', err);
        });
};

const isAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        let privateKey = fs.readFileSync('/home/node/backend/privatekey.pem');
        decodedToken = jwt.verify(token, privateKey);
    } catch (err) {
        return res.status(500).json({ message: err.message || 'Unknown error while decoding token.' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'Unauthorized' });
    } else {
        res.status(200).json({ message: 'here is your resource' });
    };
};

export { signup, login, isAuth };
