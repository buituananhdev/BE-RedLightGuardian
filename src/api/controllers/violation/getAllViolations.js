import { Violation } from '../../../models/index.js';
import { errorHelper, responseHelper, pagingHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const offset = (page - 1) * pageSize;
    const violations = await Violation.findAll({
      limit: pageSize,
      offset: offset,
    });

    const totalViolations = await Violation.count();
    const meta = pagingHelper(page, pageSize, totalViolations);
    res.json(responseHelper('success', 'Get all violations successful!', violations, meta));
  } catch (error) {
    res.status(500).json(responseHelper("failure", error.message));
  }
};


/**
 * @swagger
 * /violations:
 *   get:
 *     summary: Get all violations
 *     tags: 
 *       - Violation
 *     responses:
 *       200:
 *         description: List of violations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Violation'
 *       500:
 *         description: An internal server error occurred, please try again.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */