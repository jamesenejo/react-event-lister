import models from '../models/index';
import reusables from '../reusables';

const { Events, Going } = models;
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

                if (theEvent.views === null) {
                    Events.update({ views: 1 }, { where: { id: eventId } });
                }

                Events.update({
                    views: parseInt(theEvent.views, 10) + 1
                }, { where: { id: eventId } });

                return sendResponse(res, 200, 'Event found', theEvent);
            });
    },
    attendingEvent: (req, res) => {
        const { userId } = req.authData;
        const { eventId } = req.params;

        // check if user attempting to register to his own event
        Events.findById(eventId)
            .then((eventData) => {
                if (eventData.userId === parseInt(userId, 10)) {
                    return sendResponse(res, 403, 'You own the event, remember?');
                }

                // check if user has registered before
                Going.findOrCreate({ where: { userId, eventId } })
                    .spread((attending, created) => {
                        if (!created) {
                            return sendResponse(res, 403, 'You have already done this');
                        }

                        // register user and update attendingEvent column on the Events table
                        Going.all({ where: { eventId } })
                            .then(attendanceData => Events
                                .update({
                                    attendingEvent: attendanceData.length
                                }, { where: { id: eventId } })
                                .then(() => sendResponse(res, 200, 'Great! Looking forward to seeing you at the event')));
                    });
            });
    },
    createAnEvent: (req, res) => {
        const {
            eventName, type, venue, eventDate, eventTime, description, status
        } = req.body;
        const { userId } = req.authData;

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
            status,
            userId
        };

        // Persist new event data
        Events.create(newEvent)
            .then(() => sendResponse(res, 201, 'Event created'))
            .catch(error => sendResponse(res, 500, 'An error occured', error));

        // return sendResponse(res, 201, 'Event created');
    },
    updateAnEvent: (req, res) => {
        const { userId } = req.authData;
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
            status,
            userId
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
