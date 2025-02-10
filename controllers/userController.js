const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// User registration
const register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = new User({ email, password, role });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

// User login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.send({ user, token });
};

// Get users (admin-only for creation, editing, and deletion)
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt', filter = '' } = req.query;
    const users = await User.find({ email: { $regex: filter, $options: 'i' } })
      .sort({ [sort]: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await User.countDocuments();
    res.send({ users, total });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Admin create user
const createUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Admin update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, role } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Admin delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    await user.remove();
    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { register, login, getUsers, createUser, updateUser, deleteUser };
