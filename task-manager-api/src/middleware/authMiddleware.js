const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // Attach user to request - HELPS CONTROLLER KNOW: WHO IS CURRENTLY LOGGED IN
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: 'No token provided',
    });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      message: 'Admin access only',
    });
  }
};
module.exports = {
  protect,
  admin,
};