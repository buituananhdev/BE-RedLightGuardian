import { Vehicle } from '../../../models/index.js';
import { errorHelper, responseHelper, pagingHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const offset = (page - 1) * pageSize;
    const vehicles = await Vehicle.findAll({
      limit: pageSize,
      offset: offset,
    });

    const totalVehicles = await Vehicle.count();
    const meta = pagingHelper(page, pageSize, totalVehicles);
    res.json(responseHelper('success', 'Get all vehicles successful!', vehicles, meta));
  } catch (error) {
    res.status(500).json(responseHelper("failure", error.message));
  }
};


/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: 
 *       - Vehicle
 *     responses:
 *       200:
 *         description: List of vehicles.
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