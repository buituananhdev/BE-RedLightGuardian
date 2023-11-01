import { responseHelper } from '../../../utils/index.js';
import { createOwner } from '../../../services/database/owner.service.js';

export default async (req, res) => {
  try {
    const owner = await createOwner(req.body);
    if(!owner) {
    res.status(201).json(responseHelper(2, 'Citizen identification already exists!'));
    }
    res.status(201).json(responseHelper(1, 'Create user successfully', owner));
  } catch (error) {
    res.status(500).json(responseHelper(2, error.message));
  }
};

/**
 * @swagger
 * /owner:
 *    post:
 *      summary: Create a new owner
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the owner.
 *                citizen_identification:
 *                  type: string
 *                  description: The citizen identification of the owner.
 *                address:
 *                  type: string
 *                  description: The address of the owner.
 *                email:
 *                  type: string
 *                  description: The email address of the owner.
 *              required:
 *                - name
 *                - citizen_identification
 *                - address
 *                - email
 *      tags:
 *        - Owner
 *      responses:
 *        "201":
 *          description: Owner created successfully.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Owner'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */
