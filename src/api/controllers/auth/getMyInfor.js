import { User } from '../../../models/index.js';
import { errorHelper, responseHelper, getUserIdFromToken } from '../../../utils/index.js';

export default async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json(errorHelper('00002', req, 'User not found'));
    } else {
      res.json(responseHelper('success', '', user))
    }
  } catch (error) {
    res.status(500).json(errorHelper('00003', req, error.message));
  }
};