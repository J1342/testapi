module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('genres', [
        {
          name: 'Пьеса'
        },
        {
          name: 'Поэма'
        },
        {
          name: 'Повесть'
        }
    ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('genres', null, {});
    }
  };