import express from 'express';
import User from '../models/User.js';
import { deleteUser, getAllUsers, getSingleUser,  updateUser } from '../controllers/user.js';


import crypto from 'crypto';


const router = express.Router();

// Fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Fetch a specific user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    console.error('User ID is undefined.');
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const result = await User.findByIdAndDelete(id);
    if (result) {
      res.json({ message: 'User successfully deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    console.error('User ID is undefined.');
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const { username, lastname, email, phone } = req.body;

  if (!username || !lastname || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      username,
      lastname,
      email,
      phone
    }, { new: true, runValidators: true });

    if (updatedUser) {
      res.json({ message: 'User successfully updated', data: updatedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Failed to update user' });
  }
});


export default router;