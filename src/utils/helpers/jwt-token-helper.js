import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import { jwtSecretKey, refreshTokenSecretKey } from "../../config/index.js";

export function signAccessToken(userId) {
  const accessToken = sign({ _id: userId }, jwtSecretKey, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
  return accessToken;
}

export function signRefreshToken(userId) {
  const refreshToken = sign({ _id: userId }, refreshTokenSecretKey, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
  return refreshToken;
}
export function signConfirmCodeToken(userId, confirmCode) {
  const confirmCodeToken = sign(
    { _id: userId, code: confirmCode },
    jwtSecretKey,
    { algorithm: "HS256", expiresIn: "5m" }
  );
  return confirmCodeToken;
}

export function getUserIdFromToken(req) {
  const token = req.headers["authorization"].slice(7);
  const verified = verify(token, jwtSecretKey);
  return verified._id;
}

