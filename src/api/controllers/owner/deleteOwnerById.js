import { responseHelper } from '../../../utils/index.js';
import { deleteOwnerById } from '../../../services/database/owner.service.js';
export default async (req, res) => {
  try {
    const flag = await deleteOwnerById(req.params.id);
    if (!flag) {
      res.status(404).json(responseHelper(2, 'Owner not found'));
    } else {
      res.json(responseHelper(1, 'Owner deleted successfully'))
    }
  } catch (error) {
    res.status(500).json(responseHelper(2, error.message));
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