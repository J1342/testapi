module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('federated_credentials', {
          id: {
            type: Sequelize.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
          },
          provider: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          subject: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
          },
          user_id: {
            type: Sequelize.DataTypes.INTEGER,
            references: {
              model: 'users',
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
      return queryInterface.dropTable('federated_credentials');
    }
  };