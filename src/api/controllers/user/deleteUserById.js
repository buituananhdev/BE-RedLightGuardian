
import { responseHelper } from '../../../utils/index.js';
import { deleteUserById } from '../../../services/database/user.services.js';
export default async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const flag = await deleteUserById(userId);
    if (!flag) {
      res.status(404).json(responseHelper('failure', 'User not found!'));
    } else {
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
 *            type: string
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