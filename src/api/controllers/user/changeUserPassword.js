import { responseHelper } from '../../../utils/index.js';
import { changePassword } from '../../../services/database/user.service.js';

export default async (req, res) => {
  try {
    const { new_password } = req.body;
    const flag = await changePassword(req.user_id, new_password);
    if (!flag) {
      res.status(404).json(responseHelper(2, 'User not found'));
    } else {
      res.json(responseHelper(1, 'Change password successful'));
    }
  } catch (error) {
    res.status(500).json(responseHelper(2, error.message));
  }
};

/**
 * @swagger
 * /users/change_password:
 *   put:
 *     summary: Change user password by ID
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         description: Put access token here
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_password:
 *                 type: string
 *             required:
 *               - new_password
 *     tags:
 *       - User
 *     responses:
 *       "200":
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       "404":
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       "500":
 *         description: An internal server error occurred, please try again.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */
