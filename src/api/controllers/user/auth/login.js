import { User, Token } from "../../../../models/index.js";
import {
  errorHelper,
  getText,
  signAccessToken,
  signRefreshToken,
} from "../../../../utils/index.js";
import bcrypt from "bcryptjs";
const { compare } = bcrypt;

export default async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByInformation("username", username);
    if (!user) {
      return res
        .status(400)
        .send({ status: "failure", message: "User not found" });
    }
    const { hashPass } = hashPassword(password, user.salt);
    if (hashPass === user.password) {
      const userRole = await getUserRole(user.id);
      console.log("role =", userRole);
      const token = jwt.sign(
        { username: username, user_id: user.id, user_role: userRole },
        process.env.SECRET_KEY,
        {
          algorithm: "HS256",
          expiresIn: "1d",
          issuer: "TuanAnh",
        }
      );
      return res.status(200).json({ status: "success", access_token: token });
    } else {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error retrieving user");
  }
};
