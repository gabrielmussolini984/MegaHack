import { Pub } from '../models/index';

export default {
  store: async (req, res) => {
    try {
      const pubExist = await Pub.findOne({
        where: { email: req.body.email },
      });
      if (pubExist) return res.status(400).json({ error: 'Pub already exist' });
      const pub = await Pub.create(req.body);
      return res.json(pub);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
