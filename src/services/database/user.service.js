import User from "../../models/user.js";
import { pagingHelper } from "../../utils/index.js";
import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';

const getAllUser = async (req) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  let whereClause = {};

  if (req.query.key_word) {
    whereClause[Op.or] = [
      { username: { [Op.like]: `%${req.query.key_word}%` } },
      { email: { [Op.like]: `%${req.query.key_word}%` } },
    ];
  }

  const users = await User.findAll({
    attributes: ['id', 'username', 'email'],
    where: whereClause,
    limit: pageSize,
    offset: offset,
  });

  const totalUsers = await User.count({ where: whereClause });
  const meta = pagingHelper(page, pageSize, totalUsers);
  return { users: users, meta: meta };
};

const createUser = async (userData) => {
  userData.id = uuidv4();
  const hashPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashPassword;
  const newUser = await User.create(userData);
  return newUser;
};

const getUserById = async (userId) => {
  const user = await User.findByPk(userId);
  return user;
};

const updateUserById = async (userId, updatedData) => {
  const user = await User.findByPk(userId);
  if (user) {
    await user.update(updatedData);
    return true;
  }
  return false;
};

const deleteUserById = async (userId) => {
  const user = await User.findByPk(userId);
  if (user) {
    await user.destroy();
    return true;
  }
  return false;
};

const isUserExists = async (userId) => {
  const exists = await User.findByPk(userId);
  return exists !== null;
}

export { getAllUser, createUser, getUserById, updateUserById, deleteUserById, isUserExists };
