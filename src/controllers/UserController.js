import { User, Interest } from '../models/index';

export default {
  store: async (req, res) => {
    try {
      const userExist = await User.findOne({
        where: { email: req.body.email },
      });
      if (userExist)
        return res.status(400).json({ error: 'User already exist' });
      const user = await User.create(req.body);
      const interests = await Interest.findAll({
        where: { id: req.body.interests },
      });
      user.addInterests(interests);
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
