import { User } from '../../../models/index.js';
import { errorHelper, responseHelper, pagingHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const offset = (page - 1) * pageSize;
    const users = await User.findAll({
      limit: pageSize,
      offset: offset,
    });

    const totalUsers = await User.count();
    const meta = pagingHelper(page, pageSize, totalUsers);
    res.json(responseHelper('success', 'Get all users successful!', users, meta));
  } catch (error) {
    res.status(500).json(responseHelper("failure", error.message));
  }
};


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: 
 *       - User
 *     responses:
 *       200:
 *         description: List of users.
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