import { Violation } from '../../../models/index.js';
import { responseHelper } from '../../../utils/index.js';
import { getViolationById } from '../../../services/database/violation.service.js';
export default async (req, res) => {
  try {
    const violation = await getViolationById(req.params.id);
    if (!violation) {
      res.status(404).json(responseHelper(2,'Violation not found'));
    } else {
      res.json(responseHelper(1, '', violation))
    }
  } catch (error) {
    res.status(500).json(responseHelper(2, error.message));
  }
};
/**
 * @swagger
 * /violations/{violationId}:
 *   get:
 *     summary: Get a violation by ID
 *     tags: [Violation]
 *     parameters:
 *       - in: path
 *         name: violationId
 *         required: true
 *         description: ID of the violation
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Violation details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Violation'
 *       404:
 *         description: Violation not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       500:
 *         description: An internal server error occurred, please try again.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */