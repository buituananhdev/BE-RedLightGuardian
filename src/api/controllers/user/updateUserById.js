import User from '../../../models/user.js';
import { responseHelper } from '../../../utils/index.js';
import { updateUserById } from '../../../services/database/user.service.js';
export default async (req, res) => {
  try {
    const flag = updateUserById(req.params.id, req.body);
    if (!flag) {
      res.status(404).json(responseHelper(2, 'User not found'));
    } else {
      res.json(responseHelper(1, 'User updated successful'))
    }
  } catch (error) {
    res.status(500).json(responseHelper(2, error.message));
  }
};
/**
 * @swagger
 * /users/{userId}:
 *    put:
 *      summary: Update user information by ID
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: User ID
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: User information updated successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *        "404":
 *          description: User not found.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */