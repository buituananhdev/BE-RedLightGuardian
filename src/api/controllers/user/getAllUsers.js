import { responseHelper, pagingHelper } from '../../../utils/index.js';
import { getAllUser } from '../../../services/database/user.service.js';

export default async (req, res) => {
  try {
    const result = await getAllUser(req);
    res.json(responseHelper('success', 'Get users successful!', result.users, result.meta));
  } catch (error) {
    res.status(500).json(responseHelper('failure', error.message));
  }
};

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get users based on search criteria
 *     tags: 
 *       - User
 *     parameters:
 *       - in: query
 *         name: key_word
 *         schema:
 *           type: string
 *         description: Keyword to search
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
 *         description: List of users matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: An internal server error occurred, please try again.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */
