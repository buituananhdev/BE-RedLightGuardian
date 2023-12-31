import { Vehicle } from '../../../models/index.js';
import { responseHelper, pagingHelper } from '../../../utils/index.js';
import { getAllVehicle } from '../../../services/database/vehicle.service.js';
export default async (req, res) => {
  try {
    const result = await getAllVehicle(req);
    res.json(responseHelper(1, 'Get vehicles successful!', result.vehicles, result.meta));
  } catch (error) {
    res.status(500).json(responseHelper(2, error.message));
  }
};


/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Get vehicles based on search criteria and ownerID filter
 *     tags: 
 *       - Vehicle
 *     parameters:
 *       - in: query
 *         name: key_word
 *         schema:
 *           type: string
 *         description: Keyword for search
 *       - in: query
 *         name: ownerID
 *         schema:
 *           type: integer
 *         description: Owner ID to filter vehicles by owner
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page for pagination
 *     responses:
 *       200:
 *         description: List of vehicles matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vehicle'
 *       500:
 *         description: An internal server error occurred, please try again.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 */
