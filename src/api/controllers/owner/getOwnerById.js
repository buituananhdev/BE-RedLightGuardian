import { Owner } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const ownerId = parseInt(req.params.id);
    const owner = await Owner.findByPk(ownerId);
    if (!owner) {
      res.status(404).json(errorHelper('00002', req, 'Owner not found'));
    } else {
      res.json(owner);
    }
  } catch (error) {
    res.status(500).json(errorHelper('00003', req, error.message));
  }
};

/**
 * @swagger
 * /owners/{ownerId}:
 *   get:
 *     summary: Get a owner by ID
 *     tags: [Owner]
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the owner
 *     responses:
 *       200:
 *         description: Owner details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       404:
 *         description: Owner not found
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