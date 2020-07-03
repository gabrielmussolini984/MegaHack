import { User } from '../models/index';

export default {
  store: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'User not found' });
    if (!(await user.checkPassword(password)))
      return res.status(401).json({ error: 'Password does not match' });
    const { id, name } = user;
    const token = await user.generateToken();
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token,
    });
  },
};
