import users from '../models/users';
import reusables from '../reusables';

const { sendResponse } = reusables;

const listController = {
    signup: (req, res) => {
        const {
            firstname, lastname, email, password
        } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return sendResponse(res, 400, 'Please fill out all fields');
        }

        const newUser = {
            id: users.length + 1,
            firstname,
            lastname,
            email,
            password
        };

        // Persist new event data
        users.push(newUser);

        return sendResponse(res, 201, 'Signup successful', newUser);
    },
    login: (req, res) => {
        const { email, password } = req.body;
        let exists;

        if (!email || !password) {
            return sendResponse(res, 400, 'Please fill out all fields');
        }

        for (let i = 0; i < users.length; i += 1) {
            if (users[i].email === email && users[i].password === password) {
                exists = true;
                break;
            }
        }

        if (!exists) {
            return sendResponse(res, 401, 'Authentication failed');
        }

        return sendResponse(res, 200, 'Login successful');
    }
};

export default listController;
