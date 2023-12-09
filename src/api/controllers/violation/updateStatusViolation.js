import { responseHelper } from '../../../utils/index.js';
import { updateStatusViolation } from '../../../services/database/violation.service.js';

export default async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      res.status(400).json(responseHelper(2, 'Status is required in the request body'));
      return;
    }

    const success = await updateStatusViolation(req.params.id, status);

    if (success) {
      res.status(200).json(responseHelper(1, 'Violation updated successfully'));
    } else {
      res.status(404).json(responseHelper(2, 'Violation not found'));
    }
  } catch (error) {
    res.status(500).json(responseHelper(2, `An internal server error occurred: ${error.message}`));
  }
};

/**
 * @swagger
 * /violations/{violationId}:
 *    patch:
 *      summary: Update violation status by ID
 *      parameters:
 *        - in: path
 *          name: violationId
 *          schema:
 *            type: string
 *          required: true
 *          description: Violation ID
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put the access token here
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *              required:
 *                - status
 *      tags:
 *        - Violation
 *      responses:
 *        "200":
 *          description: Violation information updated successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Violation'
 *        "404":
 *          description: Violation not found.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: Internal Server Error.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
