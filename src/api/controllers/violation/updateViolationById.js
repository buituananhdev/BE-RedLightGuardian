import Violation from '../../../models/violation.js';
import { responseHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const violationId = parseInt(req.params.id);
    const updatedViolationData = req.body;
    const violation = await Violation.findByPk(violationId);

    if (!violation) {
      res.status(404).json(responseHelper("failure",'Violation not found'));
    } else {
      await violation.update(updatedViolationData);
      res.json(responseHelper('success', 'Violation updated successful', violation))

    }
  } catch (error) {
    res.status(500).json(responseHelper("failure", error.message));
  }
};
/**
 * @swagger
 * /violations/{violationId}:
 *    put:
 *      summary: Update violation information by ID
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
 *          description: Put access token here
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Violation'
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
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */