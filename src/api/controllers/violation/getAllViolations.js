import { Violation } from '../../../models/index.js';
import { responseHelper, pagingHelper } from '../../../utils/index.js';
import { Op } from 'sequelize';

export default async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    let whereClause = {};

    if (req.query.type) {
      whereClause.type = req.query.type;
    }
    if (req.query.status) {
      whereClause.status = req.query.status;
    }
    if (req.query.cameraID) {
      whereClause.cameraID = req.query.cameraID;
    }
    if (req.query.startDate && req.query.endDate) {
      whereClause.deadline = {
        [Op.between]: [new Date(req.query.startDate), new Date(req.query.endDate)],
      };
    }

    const violations = await Violation.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    });

    const totalViolations = await Violation.count({ where: whereClause });
    const meta = pagingHelper(page, pageSize, totalViolations);
    res.json(responseHelper('success', 'Get violations successful!', violations, meta));
  } catch (error) {
    res.status(500).json(responseHelper('failure', error.message));
  }
};

/**
 * @swagger
 * /violations:
 *   get:
 *     summary: Get violations based on search criteria and date range
 *     tags: 
 *       - Violation
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Type of violation to search for
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status of violation to search for
 *       - in: query
 *         name: cameraID
 *         schema:
 *           type: integer
 *         description: ID of the camera associated with the violation
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: |
 *           Start date for the date range filter (format: YYYY-MM-DD).
 *           Example: 2023-10-28
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: |
 *           End date for the date range filter (format: YYYY-MM-DD).
 *           Example: 2023-10-31
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page for pagination
 *     responses:
 *       200:
 *         description: List of violations matching the search criteria
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
