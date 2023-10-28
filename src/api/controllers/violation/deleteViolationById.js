import { Violation } from '../../../models/index.js';
import { responseHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const violation = await Violation.findByPk(req.params.id);
    if (!violation) {
      res.status(404).json(responseHelper("failure",'Violation not found'));
    } else {
      await violation.destroy();
      res.json(responseHelper('success', 'Delete violation successful!'));
    }
  } catch (error) {
    res.status(500).json(responseHelper("failure", error.message));
  }
};

/**
 * @swagger
 * /violations/{violationId}:
 *    delete:
 *      summary: Delete violation by ID
 *      parameters:
 *        - in: path
 *          name: violationId
 *          required: true
 *          description: ID of the violation to delete
 *          schema:
 *            type: string
 *      tags:
 *        - Violation
 *      responses:
 *        "200":
 *          description: Violation deleted successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: A success message indicating the violation has been deleted.
 *        "404":
 *          description: Violation not found.
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