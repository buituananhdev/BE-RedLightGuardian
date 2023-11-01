import { responseHelper } from '../../../utils/index.js';
import { updateOwnerById } from '../../../services/database/owner.service.js';
export default async (req, res) => {
  try {
    const flag = await updateOwnerById(req.params.id, req.body);
    if (!flag) {
      res.status(404).json(responseHelper(2, 'Owner not found'));
    } else {
      res.status(200).json(responseHelper(1, 'Owner updated successfully'))
    }
  } catch (error) {
    res.status(500).json(responseHelper(2, error.message));
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