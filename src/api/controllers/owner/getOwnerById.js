import { responseHelper } from '../../../utils/index.js';
import { getOwnerById } from '../../../services/database/owner.service.js';

export default async (req, res) => {
  try {
    const owner = await getOwnerById(req.params.id);
    if (!owner) {
      res.status(404).json(responseHelper('failure', 'Owner not found'));
    } else {
      res.status(200).json(responseHelper('success', '', owner))
    }
  } catch (error) {
    res.status(500).json(responseHelper("failure", error.message));
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