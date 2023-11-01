import { v4 as uuidv4 } from 'uuid';
import { Camera } from '../../../models/index.js';
import { responseHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const newCameraData = req.body;
    newCameraData.id = uuidv4();
    const camera = await Camera.create(newCameraData);
    res.status(201).json(responseHelper(1, '', camera));
  } catch (error) {
    res.status(500).json(responseHelper(2, error.message));
  }
};

/**
 * @swagger
 * /camera:
 *    post:
 *      summary: Create a new camera
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the camera.
 *                location:
 *                  type: string
 *                  description: The location of the camera.
 *                coordinates:
 *                  type: string
 *                  description: The coordinates of the camera.
 *              required:
 *                - name
 *                - location
 *                - coordinates
 *      tags:
 *        - Camera
 *      responses:
 *        "201":
 *          description: Camera created successfully.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Camera'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */
