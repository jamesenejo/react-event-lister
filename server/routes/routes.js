import express from 'express';
import listController from '../controllers/listController';

const routes = express.Router();
const { getAllEvents } = listController;

routes.get('/events', getAllEvents);

export default routes;
