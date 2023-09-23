module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', {
        id: {
            type: Sequelize.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
          type: Sequelize.DataTypes.STRING(128),
          allowNull: false
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true
        },
        password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true
        },
        salt: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true
        },
        role: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
      }, 
      {
        timestamps: false
      }
      );
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('userss');
    }
  };