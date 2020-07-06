const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_interest extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Interest, { foreignKey: 'interest_id' });
    }
  }
  User_interest.init(
    {
      user_id: DataTypes.INTEGER,
      interest_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User_interest',
    },
  );
  return User_interest;
};
