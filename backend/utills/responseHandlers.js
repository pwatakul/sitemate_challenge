// Response handlers
const responseHandlers = {
  success: (res, data, status = 200) => {
    console.log(`[Success] Status: ${status}, Data:`, data);
    res.status(status).json(data);
  },
  error: (res, message, status = 500) => {
    console.error(`[Error] Status: ${status}, Message: ${message}`);
    res.status(status).json({ error: message });
  },
  notFound: (res, message = 'Not found') => {
    console.error(`[Not Found] Message: ${message}`);
    res.status(404).json({ error: message });
  },
  badRequest: (res, message = 'Bad request') => {
    console.error(`[Bad Request] Message: ${message}`);
    res.status(400).json({ error: message });
  }
};

module.exports = responseHandlers;