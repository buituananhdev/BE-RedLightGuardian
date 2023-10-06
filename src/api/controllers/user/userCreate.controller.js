import { User } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const newUserData = req.body;
    const user = await User.create(newUserData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(errorHelper('00001', req, error.message));
  }
};

/**
 * @swagger
 * /user:
 *    post:
 *      summary: Create a new user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      tags:
 *        - User
 *      responses:
 *        "201":
 *          description: User created successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
