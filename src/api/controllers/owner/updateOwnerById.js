import { Owner } from '../../../models/index.js';
import { responseHelper } from '../../../utils/index.js';
import { updateOwnerById } from '../../../services/database/owner.service.js';
export default async (req, res) => {
  try {
    const ownerId = parseInt(req.params.id);
    const owner = await updateOwnerById(ownerId, req.body);

    if (!owner) {
      res.status(404).json(responseHelper('failure', 'Owner not found'));
    } else {
      res.status(200).json(responseHelper('success', 'Owner updated successfully'))
    }
  } catch (error) {
    res.status(500).json(responseHelper("failure", error.message));
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