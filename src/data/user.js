import User from "../models/user";

// Create User
const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.log(error);
  }
};

// Read User by ID
const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    console.log(error);
  }
};

// Update User by ID
const updateUserById = async (userId, userData) => {
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.update(userData);
      return user;
    } else {
      console.log('User not found!');
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

// Delete User by ID
const deleteUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      return true;
    } else {
      console.log('User not found!');
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export default { createUser, getUserById, updateUserById, deleteUserById };
