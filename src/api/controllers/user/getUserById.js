import { responseHelper } from "../../../utils/index.js";
import { getUserById } from "../../../services/database/user.services.js";
export default async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await getUserById(userId);
    if (!user) {
      res.status(404).json(responseHelper("failure", "User not found!"));
    } else {
      res.json(responseHelper("success", "", user));
    }
  } catch (error) {
    res.status(500).json(responseHelper("failure", error.message));
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
 *           type: integer
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
