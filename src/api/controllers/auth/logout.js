import { Token } from '../../../models/index.js';
import { errorHelper, getText } from '../../../utils/index.js';

export default async (req, res) => {
  
  return res.status(200).json({
    resultMessage: getText('en', '00050'),
    resultCode: '00050'
  });
};

/**
 * @swagger
 * /auth/logout:
 *    post:
 *      summary: Logout the User
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: Successfully logged out.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "401":
 *          description: Invalid token.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */