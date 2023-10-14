import { Camera } from '../../../models/index.js';
import { responseHelper, errorHelper } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const newCameraData = req.body;
    const camera = await Camera.create(newCameraData);
    res.status(201).json(responseHelper('success', '', camera));
  } catch (error) {
    res.status(500).json(errorHelper('500', req, error.message));
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
 *                cameraname:
 *                  type: string
 *                  description: The cameraname of the camera.
 *                email:
 *                  type: string
 *                  format: email
 *                  description: The email address of the camera.
 *                password:
 *                  type: string
 *                  format: password
 *                  description: The password for the camera account.
 *              required:
 *                - cameraname
 *                - email
 *                - password
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