/* eslint-disable */
import { User, Pub } from '../models/index';

export default {
  store: async (req, res) => {
    const { email, password, comingFrom } = req.body;
    console.log(comingFrom)
    if (!comingFrom || (comingFrom !== 'user' && comingFrom !== 'pub'))
      return res.status(400).json({ error: 'Not found required params' });

    if (comingFrom === 'user') {
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
    } else {
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
    }


  },
};
