module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('author_book', {
        AuthorId: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
              model: 'authors',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          BookId: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
              model: 'books',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('author_book');
    }
  };