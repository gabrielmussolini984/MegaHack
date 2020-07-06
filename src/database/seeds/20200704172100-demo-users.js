const { Model } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('interests', [
      {
        interest: 'Serie',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Gabriel',
          phone: '12997012128',
          picture: 'http://localhost/1234',
          email: 'example@example.com',
          password_hash: '123456',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
    // user.addInterests(interest);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
