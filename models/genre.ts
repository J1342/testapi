import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
  } from 'sequelize';
import { Book } from './book';


class Genre extends Model<InferAttributes<Genre>, InferCreationAttributes<Genre>> {
    declare id: CreationOptional<number>;
    declare name: string;

    declare getBook: HasManyGetAssociationsMixin<Book>;
    declare addBook: HasManyAddAssociationMixin<Book, number>;
    declare addBooks: HasManyAddAssociationsMixin<Book, number>;
    declare setBook: HasManySetAssociationsMixin<Book, number>;
    declare removeBook: HasManyRemoveAssociationMixin<Book, number>;
    declare removeBooks: HasManyRemoveAssociationsMixin<Book, number>;
    declare hasBook: HasManyHasAssociationMixin<Book, number>;
    declare hasBooks: HasManyHasAssociationsMixin<Book, number>;
    declare countBooks: HasManyCountAssociationsMixin;
    declare createBook: HasManyCreateAssociationMixin<Book, 'genreId'>;

    declare books?: NonAttribute<Book[]>;

    declare static associations: {
      books: Association<Genre, Book>
    };
    
    static associate(models: any){
      this.hasMany(models.Book, {
        sourceKey: 'id',
        foreignKey: 'genreId',
        as: 'books'
      });
    }
  
  }

  function model(sequelize: any, types: any){
    Genre.init(
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
      },
      {
        sequelize,
        tableName: 'genres',
        timestamps: false
      }
    );
    return Genre;
  }

  export { Genre, model };