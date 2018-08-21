import express from 'express';
import listController from '../controllers/listController';
import userController from '../controllers/userController';
import protect from '../middlewares/protect';

const routes = express.Router();
const {
    getAllEvents,
    getAnEvent,
    createAnEvent,
    updateAnEvent,
    deleteAnEvent
} = listController;

const { signup, login } = userController;

const { authenticateUser, authoriseUser } = protect;

routes.get('/events', getAllEvents);
routes.get('/events/:eventId', getAnEvent);
routes.post('/users/events', authenticateUser, createAnEvent);
routes.put('/users/events/:eventId', authenticateUser, authoriseUser, updateAnEvent);
routes.delete('/users/events/:eventId', authenticateUser, authoriseUser, deleteAnEvent);

routes.post('/auth/signup', signup);
routes.post('/auth/login', login);

export default routes;
