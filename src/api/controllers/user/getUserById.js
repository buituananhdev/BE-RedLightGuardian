import { responseHelper } from "../../../utils/index.js";
import { getUserById } from "../../../services/database/user.service.js";
export default async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      res.status(404).json(responseHelper(2, "User not found!"));
    } else {
      res.json(responseHelper("1", "", user));
    }
  } catch (error) {
    res.status(500).json(responseHelper(2, error.message));
  }
};

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       500:
 *         description: An internal server error occurred, please try again.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */
