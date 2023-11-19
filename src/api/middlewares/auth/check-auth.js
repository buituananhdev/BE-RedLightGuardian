import { responseHelper } from "../../../utils/index.js";
import { jwtSecretKey } from "../../../config/index.js";
import { isUserExists } from "../../../services/database/user.service.js";
import { isTokenExists  } from "../../../services/database/token.service.js";
import jwt from "jsonwebtoken";
const { verify } = jwt;

export default async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token || !token.includes("Bearer ")) {
    return res.status(401).json(responseHelper(2, 'Invalid token!'));
  }

  const tokenWithoutBearer = token.replace("Bearer ", "");

  try {
    req.user = verify(tokenWithoutBearer, jwtSecretKey);
    const userExists = await isUserExists(req.user._id);
    if (!userExists) {
      return res.status(400).json(responseHelper(2, 'User not found!'));
    }

    // const tokenExists = await isTokenExists (req.user._id, tokenWithoutBearer);
    // if (!tokenExists) {
    //   return res.status(401).json(responseHelper(2, 'Invalid UserID!'));
    // }

    next();
  } catch (err) {
    return res.status(401).json(responseHelper(2, err.message));
  }
};
