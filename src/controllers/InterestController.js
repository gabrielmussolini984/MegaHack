import { Interest } from '../models/index';

export default {
  index: async (req, res) => {
    try {
      const interests = await Interest.findAll({ attributes: ['interest'] });
      return res.json(interests);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
