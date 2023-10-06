import { User, Token } from '../../../models/index.js';
import { generateRandomCode, errorHelper, getText, logger } from '../../../utils/index.js';
import bcrypt from 'bcryptjs';
const { hash } = bcrypt;

export default async (req, res) => {
  const anon = 'anon' + generateRandomCode(8);
  const hashed = await hash(anon, 10);
  
  try {
    await User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          name: anon,
          username: anon,
          email: anon + '@anon.com',
          password: hashed,
          photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png',
          isActivated: false,
          deletedAt: Date.now(),
        },
      }
    );

    await Token.deleteOne({ userId: req.user._id });

    return res.status(200).json({
      resultMessage: { en: getText('en', '00092'), tr: getText('tr', '00092') },
      resultCode: '00092',
    });
  } catch (err) {
    return res.status(500).json(errorHelper('00090', req, err.message));
  }
};

/**
 * @swagger
 * /user:
 *    delete:
 *      summary: Delete the User
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
 *          description: Your account was deleted successfully.
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
