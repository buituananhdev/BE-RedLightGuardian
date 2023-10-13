import { Owner } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const newOwnerData = req.body;
    const owner = await Owner.create(newOwnerData);
    res.status(201).json(owner);
  } catch (error) {
    res.status(500).json(errorHelper('00001', req, error.message));
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
 *                ownername:
 *                  type: string
 *                  description: The ownername of the owner.
 *                email:
 *                  type: string
 *                  format: email
 *                  description: The email address of the owner.
 *                password:
 *                  type: string
 *                  format: password
 *                  description: The password for the owner account.
 *              required:
 *                - ownername
 *                - email
 *                - password
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