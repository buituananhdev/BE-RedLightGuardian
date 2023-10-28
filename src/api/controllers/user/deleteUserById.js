import { User } from '../../../models/index.js';
import { errorHelper, responseHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json(errorHelper('00002', req, 'User not found'));
    } else {
      await user.destroy();
      res.json(responseHelper('success', 'Delete user successful!'));
    }
  } catch (error) {
    res.status(500).json(responseHelper("failure", error.message));
  }
};

/**
 * @swagger
 * /users/{userId}:
 *    delete:
 *      summary: Delete user by ID
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: ID of the user to delete
 *          schema:
 *            type: integer
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: User deleted successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: A success message indicating the user has been deleted.
 *        "404":
 *          description: User not found.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */