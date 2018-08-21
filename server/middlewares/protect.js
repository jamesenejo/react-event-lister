import models from '../models/index';
import reusables from '../reusables';

const { Events } = models;
const { sendResponse } = reusables;

const protect = {
    authenticateUser: (req, res, next) => {
        const { userId } = req.cookies;

        if (!userId) {
            return sendResponse(res, 401, 'Unauthenticated');
        }

        req.authData = { userId };
        next();
    },
    authoriseUser: (req, res, next) => {
        const { eventId } = req.params;
        const { userId } = req.authData;

        Events.findById(eventId)
            .then((eventData) => {
                if (eventData === null) {
                    return sendResponse(res, 404, 'Event not found');
                }

                if (eventData.userId === userId) {
                    return next();
                }

                return sendResponse(res, 401, 'Unauthorised');
            });
    }
};

export default protect;
