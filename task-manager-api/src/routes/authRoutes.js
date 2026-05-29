const express = require('express');
const {
  protect,
  admin,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/test', (req, res) => {
  res.send('Auth routes working');
});

const {
  registerUser,
  loginUser,
} = require('../controllers/authController');

router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

router.get(
  '/admin',
  protect,
  admin,
  (req, res) => {
    res.json({
      message: 'Welcome Admin',
    });
  }
);

router.post('/register', registerUser);
router.post('/login', loginUser);
module.exports = router;