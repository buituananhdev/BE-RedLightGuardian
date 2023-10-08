import { User } from "../../../../models/index.js";
import { errorHelper } from "../../../../utils/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: { username: username },
    });

    if (!user) {
      return res.status(404).json(errorHelper("00002", req, "Invalid username or password"));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign(
        { username: username, user_id: user.id },
        process.env.JWT_SECRET_KEY,
        { algorithm: "HS256", expiresIn: "1d", issuer: "TuanAnh" }
      );
      return res.status(200).json({ status: "success", access_token: token });
    } else {
      return res.status(404).json(errorHelper("00002", req, "Invalid username or password"));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(errorHelper("00090", req, error.message));
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