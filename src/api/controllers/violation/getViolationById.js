import { Violation } from '../../../models/index.js';
import { errorHelper, responseHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const violationId = parseInt(req.params.id);
    const violation = await Violation.findByPk(violationId);
    if (!violation) {
      res.status(404).json(errorHelper('00002', req, 'Violation not found'));
    } else {
      res.json(responseHelper('success', '', violation))
    }
  } catch (error) {
    res.status(500).json(errorHelper('00003', req, error.message));
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
 *           type: integer
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