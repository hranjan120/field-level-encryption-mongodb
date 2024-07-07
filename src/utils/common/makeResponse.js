/*-----------*/
export const successResponse = (msg, dt = {}) => ({
  statusText: 'OK', statusValue: 200, message: msg, responseData: dt,
});

/*-----------*/
export const badResponse = (msg, stCode = '') => ({
  statusText: 'FAIL', statusValue: 400, message: msg, statusCode: stCode,
});

/*-----------*/
export const unauthorizedResponse = (msg) => ({ statusText: 'FAIL', statusValue: 401, message: msg });

/*-----------*/
export const forbiddenResponse = (msg) => ({ statusText: 'FAIL', statusValue: 403, message: msg });
