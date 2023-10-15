import { Owner } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const ownerId = parseInt(req.params.id);
    const owner = await Owner.findByPk(ownerId);

    if (!owner) {
      res.status(404).json(errorHelper('00002', req, 'Owner not found'));
    } else {
      await owner.destroy();
      res.json({ message: 'Owner deleted successfully' });
    }
  } catch (error) {
    res.status(500).json(errorHelper('00005', req, error.message));
  }
};

/**
 * @swagger
 * /owners/{ownerId}:
 *   delete:
 *     summary: Delete a owner by ID
 *     tags: [Owner]
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         description: ID of the owner
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Owner deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
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