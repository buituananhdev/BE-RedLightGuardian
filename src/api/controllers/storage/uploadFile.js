import { errorHelper, responseHelper } from "../../../utils/index.js";

export default async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json(errorHelper("00008", req, "No file uploaded!"));
      return;
    }
    res.json(
      responseHelper("success", "Upload file successful!", {
        url: req.file.path,
      })
    );
  } catch (error) {
    res.status(500).json(responseHelper("failure", error.message));
  }
};

/**
 * @swagger
 * /storages/upload:
 *   post:
 *     summary: Upload an image
 *     tags: [Image]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 secure_url:
 *                   type: string
 *       400:
 *         description: Bad request, invalid file format or size.
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
