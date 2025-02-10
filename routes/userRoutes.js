const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getUsers);  // Get users
router.post('/', adminMiddleware, createUser);  // Admin creates user
router.put('/:id', adminMiddleware, updateUser);  // Admin updates user
router.delete('/:id', adminMiddleware, deleteUser);  // Admin deletes user

module.exports = router;
