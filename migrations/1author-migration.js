module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('authors', {
        id: {
            type: Sequelize.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
          type: Sequelize.DataTypes.STRING(128),
          allowNull: false
        },
        dateOfBirth: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true
        }
      }, 
      {
        timestamps: false
      }
      );
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('authors');
    }
  };