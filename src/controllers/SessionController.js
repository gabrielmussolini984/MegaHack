import { User, Pub, Interest } from '../models/index';

export default {
  store: async (req, res) => {
    const { email, password, comingFrom } = req.body;
    if (!comingFrom || (comingFrom !== 'user' && comingFrom !== 'pub'))
      return res.status(400).json({ error: 'Not found required params' });

    if (comingFrom === 'user') {
      const user = await User.findOne({
        where: { email },
        include: [
          { model: Interest, as: 'interests', attributes: ['interest'] },
        ],
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt'],
        },
      });
      if (!user) return res.status(401).json({ error: 'User not found' });
      if (!(await user.checkPassword(password)))
        return res.status(401).json({ error: 'Password does not match' });
      const token = await user.generateToken();
      return res.json({
        user,
        token,
      });
    }
    const pub = await Pub.findOne({ where: { email } });
    if (!pub) return res.status(401).json({ error: 'Pub not found' });
    if (!(await pub.checkPassword(password)))
      return res.status(401).json({ error: 'Password does not match' });
    const { id, name } = pub;
    const token = await pub.generateToken();
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
