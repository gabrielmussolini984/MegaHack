import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pub extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // (model)
      // define association here
    }
  }
  Pub.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      picture: DataTypes.INTEGER,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Pub',
    },
  );
  Pub.addHook('beforeCreate', async (pub) => {
    if (pub.password) {
      // eslint-disable-next-line
      pub.password_hash = await bcrypt.hash(pub.password, 8);
    }
  });
  Pub.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash);
  };
  Pub.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  };
  return Pub;
};
