const reusables = {
    sendResponse: (res, statusCode, message, responseObject) => {
        if (!responseObject) {
            return res.status(statusCode).json({ message });
        }
        return res.status(statusCode).json({ message, responseObject });
    }
};

export default reusables;
