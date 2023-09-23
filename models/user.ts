import {
 InferAttributes, InferCreationAttributes, CreationOptional, Model
  } from 'sequelize';
import { FederatedCredential } from './federated_credentials';


class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: CreationOptional<string>;
    declare password: CreationOptional<string>;
    declare salt: CreationOptional<string>;
    declare role: string;

    static associate(models: any){
      this.hasMany(models.FederatedCredential, {
        sourceKey: 'id',
        foreignKey: 'user_id',
        as: 'credentials'
      });
    }
}

function model(sequelize: any, DataTypes: any){

    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        username: {
          type: new DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true
          },
        salt: {
          type: DataTypes.STRING,
          allowNull: true
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        tableName: 'users',
        sequelize ,
        timestamps: false
      }
    );
  
    return User;
  }

export {User, model};