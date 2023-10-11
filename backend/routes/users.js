const router = require('express').Router();
const { validateUserId, validateUserUpdate, validateUserAvatar } = require('../utils/validation');

const {
  getUsers,
  getUser,
  getCurrentUser,
  setUser,
  setUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);

router.get('/:id', validateUserId, getUser);

router.patch('/me', validateUserUpdate, setUser);
router.patch('/me/avatar', validateUserAvatar, setUserAvatar);

module.exports = router;
