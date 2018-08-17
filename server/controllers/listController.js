import events from '../models/events';
import reusables from '../reusables';

const { sendResponse } = reusables;

const listController = {
    getAllEvents: (req, res) => {
        const allPublished = [];

        events.forEach((publishedEvent) => {
            if (publishedEvent.status === 'Published') {
                allPublished.push(publishedEvent);
            }
        });

        return sendResponse(res, 200, `Found ${allPublished.length} events`, allPublished);
    },
    getAnEvent: (req, res) => {
        const { eventId } = req.params;
        let theEvent;

        for (let i = 0; i < events.length; i += 1) {
            if ((events[i].id === parseInt(eventId, 10)) && events[i].status === 'Published') {
                theEvent = events[i];
                break;
            }
        }

        if (theEvent) {
            return sendResponse(res, 200, 'Event found', theEvent);
        }
        return sendResponse(res, 404, 'Event not found');
    },
    createAnEvent: (req, res) => {
        const {
            type, venue, time, status
        } = req.body;

        if (!type || !venue || !time || !status) {
            return sendResponse(res, 400, 'Please fill out all fields');
        }

        const newEvent = {
            id: events.length + 1,
            type,
            venue,
            time,
            status
        };

        // Persist new event data
        events.push(newEvent);

        return sendResponse(res, 201, 'Event created');
    },
    updateAnEvent: (req, res) => {
        const { eventId } = req.params;
        const {
            type, venue, time, status
        } = req.body;
        let updatedEvent;

        if (!type || !venue || !time || !status) {
            return sendResponse(res, 400, 'Please fill out all fields');
        }

        for (let i = 0; i < events.length; i += 1) {
            if (events[i].id === parseInt(eventId, 10)) {
                events[i] = { ...events[i], ...req.body };
                updatedEvent = events[i];
                break;
            }
        }

        if (!updatedEvent) {
            return sendResponse(res, 404, 'Event not found');
        }

        return sendResponse(res, 201, 'Event updated');
    },
    deleteAnEvent: (req, res) => {
        const { eventId } = req.params;
        let deletedEvent;

        for (let i = 0; i < events.length; i += 1) {
            if (events[i].id === parseInt(eventId, 10)) {
                deletedEvent = events[i];
                events.splice(i, 1);
                break;
            }
        }

        if (!deletedEvent) {
            return sendResponse(res, 404, 'Event not found');
        }

        return sendResponse(res, 200, 'Event deleted');
    }
};

export default listController;
