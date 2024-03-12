const responseHandlers = require('../utills/responseHandlers');

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  responseHandlers.error(res, 'Internal server error', 500);
}

module.exports = errorHandler;