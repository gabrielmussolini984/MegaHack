import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash);
  };
  User.generateToken = function () {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  };
  User.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      picture: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  User.addHook('beforeCreate', async (user, options) => {
    if (user.password) {
      // eslint-disable-next-line
      user.password_hash = await bcrypt.hash(user.password, 8);
    }
  });

  return User;
};
