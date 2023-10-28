import { Owner } from '../../../models/index.js';
import { errorHelper, responseHelper, pagingHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const offset = (page - 1) * pageSize;
    const owners = await Owner.findAll({
      limit: pageSize,
      offset: offset,
    });

    const totalOwners = await Owner.count();
    const meta = pagingHelper(page, pageSize, totalOwners);
    res.status(200).json(responseHelper('success', 'Get all owners successful!', owners, meta));
  } catch (error) {
    res.status(500).json(responseHelper("failure", error.message));
  }
};

/**
 * @swagger
 * /owners:
 *   get:
 *     summary: Get all owners
 *     tags: [Owner]
 *     responses:
 *       200:
 *         description: List of owners.
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