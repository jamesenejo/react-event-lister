import models from '../models/index';
import reusables from '../reusables';

const { Events } = models;
const { sendResponse } = reusables;

const listController = {
    getAllEvents: (req, res) => {
        Events.all().then((allEvents) => {
            if (allEvents.length === 0) {
                return sendResponse(res, 404, 'No events at the moment');
            }
            return sendResponse(res, 404, `Found ${allEvents.length} events`, allEvents);
        });
    },
    getAnEvent: (req, res) => {
        const { eventId } = req.params;

        Events.findById(eventId)
            .then((theEvent) => {
                if (theEvent === null) {
                    return sendResponse(res, 404, 'Event not found');
                }
                return sendResponse(res, 200, 'Event found', theEvent);
            });
    },
    createAnEvent: (req, res) => {
        const {
            eventName, type, venue, eventDate, eventTime, description, status
        } = req.body;

        if (!eventName || !type || !venue || !eventDate || !eventTime || !description || !status) {
            return sendResponse(res, 400, 'Please fill out all fields');
        }

        const newEvent = {
            eventName,
            type,
            venue,
            eventDate,
            eventTime,
            description,
            status
        };

        // Persist new event data
        Events.create(newEvent)
            .then(() => sendResponse(res, 201, 'Event created'))
            .catch(error => sendResponse(res, 500, 'An error occured', error));

        // return sendResponse(res, 201, 'Event created');
    },
    updateAnEvent: (req, res) => {
        const { eventId } = req.params;
        const {
            eventName, type, venue, eventDate, eventTime, description, status
        } = req.body;

        if (!eventName || !type || !venue || !eventDate || !eventTime || !description || !status) {
            return sendResponse(res, 400, 'Please fill out all fields');
        }

        const newEvent = {
            eventName,
            type,
            venue,
            eventDate,
            eventTime,
            description,
            status
        };

        Events.update(newEvent, { where: { id: eventId } })
            .then((eventData) => {
                if (eventData[0] === 0) {
                    return sendResponse(res, 200, 'Event not found');
                }
                return sendResponse(res, 200, 'Event updated successfully');
            })
            .catch(error => sendResponse(res, 500, 'An error occured', error));
    },
    deleteAnEvent: (req, res) => {
        const { eventId } = req.params;

        Events.destroy({ where: { id: eventId } })
            .then((eventData) => {
                if (eventData === 0) {
                    return sendResponse(res, 404, 'Event not found');
                }
                return sendResponse(res, 200, 'Event deleted successfully');
            })
            .catch(error => sendResponse(res, 500, 'There was a problem', error));
    }
};

export default listController;
