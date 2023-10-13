import { Owner } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const owners = await Owner.findAll();
    res.json(owners);
  } catch (error) {
    res.status(500).json(error);
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