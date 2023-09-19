import {
    Association, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
  } from 'sequelize';
import { Book } from './book';


  class Author extends Model<InferAttributes<Author>, InferCreationAttributes<Author>> {

    declare id: CreationOptional<number>;
    declare name: string;
    declare dateOfBirth: CreationOptional<Date>

    declare getBook: HasManyGetAssociationsMixin<Book>;
    declare addBook: HasManyAddAssociationMixin<Book, number>;
    declare addBooks: HasManyAddAssociationsMixin<Book, number>;
    declare setBook: HasManySetAssociationsMixin<Book, number>;
    declare removeBook: HasManyRemoveAssociationMixin<Book, number>;
    declare removeBooks: HasManyRemoveAssociationsMixin<Book, number>;
    declare hasBook: HasManyHasAssociationMixin<Book, number>;
    declare hasBooks: HasManyHasAssociationsMixin<Book, number>;
    declare countBooks: HasManyCountAssociationsMixin;
    declare createBook: HasManyCreateAssociationMixin<Book>;

    declare static associations: {
      books: Association<Author, Book>
    };

    static associate(models: any){
      this.belongsToMany(models.Book, { through: models.AuthorBook,
                                        foreignKey: 'AuthorId' });
    }
  }

function model(sequelize: any, DataTypes: any){

  Author.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: 'authors',
      sequelize ,
      timestamps: false
    }
  );

  return Author;
}

export {Author, model};