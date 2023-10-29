import Token from "../../models/token.js";
import { v4 as uuidv4 } from "uuid";

const createToken = async (tokenData) => {
  const newToken = await Token.create(tokenData);
  return newToken;
};

const deleteToken = async (access_token) => {
  const token = await Token.findOne({ where: { access_token } });
  if (token !== null) {
    await token.destroy();
    return true;
  }
  return false;
};


const isTokenExists = async (userId, token) => {
  const existingToken = await Token.findOne({
    where: {
      userId: userId,
      access_token: token,
    },
  });
  return existingToken !== null;
};

export { createToken, deleteToken, isTokenExists };
