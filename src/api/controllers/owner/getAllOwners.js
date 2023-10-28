import { responseHelper } from '../../../utils/index.js';
import { getAllOwner } from '../../../services/database/owner.service.js';
export default async (req, res) => {
  try {
    const result = await getAllOwner(req);
    res.status(200).json(responseHelper('success', 'Get owners successful!', result.owners, result.meta));
  } catch (error) {
    res.status(500).json(responseHelper('failure', error.message));
  }
};

/**
 * @swagger
 * /owners:
 *   get:
 *     summary: Get owners based on search criteria
 *     tags: [Owner]
 *     parameters:
 *       - in: query
 *         name: key_word
 *         schema:
 *           type: string
 *         description: Keyword for search
 *       - in: query
 *         name: citizen_identification
 *         schema:
 *           type: string
 *         description: Citizen identification number to search for
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Owner's email address to search for
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
 *         description: List of owners matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Owner'
 *       500:
 *         description: An internal server error occurred, please try again.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */
