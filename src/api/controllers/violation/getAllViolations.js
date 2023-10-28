import { responseHelper } from '../../../utils/index.js';
import { getAllViolation } from '../../../services/database/violation.service.js';
export default async (req, res) => {
  try {
    const result = await getAllViolation(req);
    res.json(responseHelper('success', 'Get violations successful!', result.violations, result.meta));
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
