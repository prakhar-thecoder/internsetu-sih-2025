const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  const token = req.header('Token');
  if (!token) {
    return res.json({ success: false, message: 'No token provided.' });
  }
  const decoded = verifyToken(token);
  if (!decoded || !decoded.userId) {
    return res.json({ success: false, message: 'Invalid or expired token.' });
  }
  req.userId = decoded.userId;
  next();
};

module.exports = authMiddleware;
