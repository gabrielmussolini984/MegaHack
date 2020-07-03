import { User } from '../models/index';

export default {
  store: async (req, res) => {
    try {
      const userExist = await User.findOne({
        where: { email: req.body.email },
      });
      if (userExist)
        return res.status(400).json({ error: 'User already exist' });
      const { id, name, email } = await User.create(req.body);
      return res.json({ id, name, email });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
