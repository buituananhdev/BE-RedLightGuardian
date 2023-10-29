import { User } from "../../../models/index.js";
import { responseHelper, signRefreshToken, signAccessToken } from "../../../utils/index.js";
import { createToken } from "../../../services/database/token.service.js";
import bcrypt from "bcryptjs";

export default async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: { username: username },
    });

    if (!user) {
      return res.status(404).json(responseHelper( "Invalid username or password"));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const accessToken = signAccessToken(user.id);
      const refreshToken = signRefreshToken(user.id);
      const tokenEntity = { access_token: accessToken, refresh_token: refreshToken, userId: user.id, expiresIn: 24 * 60 * 60, createdAt: Date.now() };
      await createToken(tokenEntity);
      return res.status(200).json(responseHelper('success', '', { access_token: accessToken, refresh_token: refreshToken, expires_in: 24 * 60 * 60, created_at: Date.now() }));
    } else {
      return res.status(404).json(responseHelper("failure", "Invalid username or password"));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(responseHelper("failure", error.message));
  }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user and get access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Authentication successful, returns access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                 access_token:
 *                   type: string
 *                   description: JWT access token
 *       404:
 *         description: Invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResult'
 *       500:
 *         description: An internal server error occurred, please try again.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResult'
 */