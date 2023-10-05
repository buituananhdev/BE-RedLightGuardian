import express from 'express';
import {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../../data/user';

const vehicleRouter = express.Router();

// Route để tạo một người dùng mới
vehicleRouter.post('/users', async (req, res) => {
  try {
    const newUser = req.body; // Lấy dữ liệu người dùng từ yêu cầu
    const user = await createUser(newUser);
    res.status(201).json(user); // Trả về người dùng đã tạo
  } catch (error) {
    res.status(500).json({ error: 'Could not create user' });
  }
});

// Route để lấy thông tin người dùng bằng ID
vehicleRouter.get('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await getUserById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not get user' });
  }
});

// Route để cập nhật thông tin người dùng bằng ID
vehicleRouter.put('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    const user = await updateUserById(userId, updatedUserData);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update user' });
  }
});

// Route để xóa người dùng bằng ID
vehicleRouter.delete('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await deleteUserById(userId);
    if (result) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not delete user' });
  }
});

export default vehicleRouter;
