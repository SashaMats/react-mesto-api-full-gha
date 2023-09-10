/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const { SECRET_KEY = 'some-secret-key' } = process.env;
module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизацияxx');
  }
  const token = authorization.replace('Bearer ', '');
  if (!token) {
    throw new UnauthorizedError('Необходима авторизацияzz');
  } let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизацияyy'));
  }

  req.user = payload;
  next();
};
