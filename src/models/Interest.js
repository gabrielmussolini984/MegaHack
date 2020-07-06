const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line
    static associate(models) {
      this.belongsToMany(models.User, {
        through: 'user_interests',
        foreignKey: 'interest_id',
        as: 'users',
      });
    }
  }
  Interest.init(
    {
      interest: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Interest',
    },
  );
  return Interest;
};
