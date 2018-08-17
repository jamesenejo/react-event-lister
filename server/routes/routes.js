import express from 'express';
import listController from '../controllers/listController';
import userController from '../controllers/userController';

const routes = express.Router();
const {
    getAllEvents,
    getAnEvent,
    createAnEvent,
    updateAnEvent,
    deleteAnEvent
} = listController;
const { signup, login } = userController;

routes.get('/events', getAllEvents);
routes.get('/events/:eventId', getAnEvent);
routes.post('/users/events', createAnEvent);
routes.put('/users/events/:eventId', updateAnEvent);
routes.delete('/users/events/:eventId', deleteAnEvent);

routes.post('/auth/signup', signup);
routes.post('/auth/login', login);

export default routes;
