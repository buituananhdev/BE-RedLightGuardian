import { responseHelper } from "../../../utils/index.js";
import { createUser } from "../../../services/database/user.service.js";
export default async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(responseHelper("success", "", user));
  } catch (error) {
    res.status(500).json(responseHelper("failure", error.message));
  }
};

/**
 * @swagger
 * /users:
 *    post:
 *      summary: Create a new user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: The username of the user.
 *                email:
 *                  type: string
 *                  format: email
 *                  description: The email address of the user.
 *                password:
 *                  type: string
 *                  description: The password for the user account.
 *              required:
 *                - username
 *                - email
 *                - password
 *      tags:
 *        - User
 *      responses:
 *        "201":
 *          description: User created successfully.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */
