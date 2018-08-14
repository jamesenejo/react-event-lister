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
    }
};

export default listController;
