module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('books', {
          id: {
            type: Sequelize.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
          },
          title: {
            type: Sequelize.DataTypes.STRING(128),
            allowNull: false
          },
          publicationDate: {
              type: Sequelize.DataTypes.DATE,
              allowNull: true
          },
          editOffice: {
            type: Sequelize.DataTypes.STRING(256),
            allowNull: true
          },
          genreId: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
              model: 'genres',
              key: 'id'
            }
          }
      },
      {
        timestamps: false 
      }
      );
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('books');
    }
  };