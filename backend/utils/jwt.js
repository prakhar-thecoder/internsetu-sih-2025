const jwt = require('jsonwebtoken');


const generateToken = (payload, secret = process.env.JWT_SECRET, options = {}) => {
  return jwt.sign(payload, secret, options);
};

const verifyToken = (token, secret = process.env.JWT_SECRET, options = {}) => {
  try {
    return jwt.verify(token, secret, options);
  } catch (err) {
    return null;
  }
};

const decodeToken = (token, options = {}) => {
  return jwt.decode(token, options);
};

module.exports = { generateToken, verifyToken, decodeToken };
