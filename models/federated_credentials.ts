import {
    InferAttributes, InferCreationAttributes, CreationOptional, Model,
    ForeignKey
     } from 'sequelize';
import { User } from './user';
   
   
class FederatedCredential extends Model<InferAttributes<FederatedCredential>,
                               InferCreationAttributes<FederatedCredential>> {
    declare id: CreationOptional<number>;
    declare user_id: ForeignKey<User['id']>;
    declare provider: string;
    declare subject: string;
    
    static associate(models: any){
        this.belongsTo(models.User, {
          foreignKey: 'user_id'
        });
    }
}

function model(sequelize: any, DataTypes: any){

    FederatedCredential.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        provider: {
          type: new DataTypes.STRING,
          allowNull: false
        },
        subject: {
          type: DataTypes.STRING,
          allowNull: false
        },
      },
      {
        tableName: 'federated_credentials',
        sequelize ,
        timestamps: false
      }
    );
  
    return FederatedCredential;
  }

export {FederatedCredential, model};