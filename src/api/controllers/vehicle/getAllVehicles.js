import { Vehicle } from '../../../models/index.js';
import { responseHelper, pagingHelper } from '../../../utils/index.js';
import { getAllVehicle } from '../../../services/database/vehicle.service.js';
export default async (req, res) => {
  try {
    const result = await getAllVehicle(req);
    res.json(responseHelper('success', 'Get vehicles successful!', result.vehicles, result.meta));
  } catch (error) {
    res.status(500).json(responseHelper('failure', error.message));
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
 *         name: vehicleName
 *         schema:
 *           type: string
 *         description: Vehicle name to search for
 *       - in: query
 *         name: licensePlate
 *         schema:
 *           type: string
 *         description: License plate number to search for
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: Vehicle brand to search for
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: Vehicle color to search for
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
