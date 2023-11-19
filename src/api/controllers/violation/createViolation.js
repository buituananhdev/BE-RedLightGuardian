import { responseHelper } from '../../../utils/index.js';
import { createMultipleViolations } from '../../../services/database/violation.service.js';

export default async (req, res) => {
  try {
    const { licensePlates, cameraID } = req.body;
    console.log(licensePlates);
    console.log("image", req.file);

    if (!req.file) {
      res.status(400).json(responseHelper(2, "No file uploaded!"));
      return;
    }

    const violations = await createMultipleViolations(licensePlates, cameraID, req.file.path);

    if (violations.length === 0) {
      res.status(400).json(responseHelper(2, "No violations created!"));
      return;
    }

    res.status(201).json(responseHelper(1, '', violations));
  } catch (error) {
    res.status(500).json(responseHelper(2, error.message));
  }
};


/**
 * @swagger
 * /violations:
 *    post:
 *      summary: Create multiple violations
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                licensePlates:
 *                  type: array
 *                  items:
 *                    type: string
 *                  description: An array of license plates associated with the violations.
 *                cameraID:
 *                  type: string
 *                  description: The ID of the camera capturing the violations.
 *                file:
 *                  type: string
 *                  format: binary
 *                  description: The image file of the violations.
 *              required:
 *                - licensePlates
 *                - cameraID
 *      tags:
 *        - Violation
 *      responses:
 *        "201":
 *          description: Violations created successfully.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Violation'
 *        "400":
 *          description: Bad request. No file uploaded or no violations created.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Result'
 */
