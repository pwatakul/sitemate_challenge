const errorHandler = require('../middlewares/errorHandler');

describe('Error Handling Middleware Tests', () => {
  it('should log the error and send 500 Internal Server Error', () => {
    const err = new Error('Test error');
    const req = {};
    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});
