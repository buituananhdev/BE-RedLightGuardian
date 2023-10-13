import { Owner } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const updatedOwnerData = req.body;
    const owner = await Owner.findByPk(ownerId);

    if (!owner) {
      res.status(404).json(errorHelper('00002', req, 'Owner not found'));
    } else {
      await owner.update(updatedOwnerData);
      res.json(owner);
    }
  } catch (error) {
    res.status(500).json(errorHelper('00004', req, error.message));
  }
};

/**
 * @swagger
 * /owners/{ownerId}:
 *   put:
 *     summary: Update a owner by ID
 *     tags: [Owner]
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         description: ID of the owner
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     responses:
 *       200:
 *         description: Owner updated successfully.
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