import bcrypt from 'bcrypt';

import models from '../models/index';
import reusables from '../reusables';

const { Users } = models;
const { sendResponse } = reusables;

const listController = {
    signup: (req, res) => {
        const {
            username, firstname, lastname, email, password
        } = req.body;

        if (!username || !firstname || !lastname || !email || !password) {
            return sendResponse(res, 400, 'Please fill out all fields');
        }

        // Hash password
        bcrypt.hash(password, 10)
            .then((hashedPassword) => {
                const newUser = {
                    username,
                    firstname,
                    lastname,
                    email,
                    password: hashedPassword
                };

                // Persist new user data
                Users.create(newUser)
                    .then((userData) => {
                        res.cookie('userId', userData.id, {
                            httpOnly: true,
                            maxAge: 1000 * 60 * 60 * 24
                        });

                        return sendResponse(res, 201, 'Signup successful');
                    });
            });
    },
    login: (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendResponse(res, 400, 'Please fill out all fields');
        }

        Users.findOne({ where: { email } })
            .then((userData) => {
                if (userData === null || userData === undefined) {
                    return sendResponse(res, 401, 'Email or password incorrect');
                }

                bcrypt.compare(password, userData.password)
                    .then((result) => {
                        if (!result) {
                            return sendResponse(res, 401, 'Email or password incorrect');
                        }

                        res.cookie('userId', userData.id, {
                            httpOnly: true,
                            maxAge: 1000 * 60 * 60 * 24
                        });

                        return sendResponse(res, 200, 'Login successful');
                    });
            });
    }
};

export default listController;
