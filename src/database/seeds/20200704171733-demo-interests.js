module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('interests', [
      {
        interest: 'Serie',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        interest: 'Anime',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        interest: 'Futebol',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        interest: 'Programação',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('interests', null, {});
  },
};
