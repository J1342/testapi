module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('genres', {
          id: {
            type: Sequelize.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
          },
          name: {
            type: Sequelize.DataTypes.STRING(128),
            allowNull: false
          }
      },
      {
        timestamps: false
      }
      );
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('genres');
    }
  };
