import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
  } from 'sequelize';
import { Genre } from './genre';
import { Author } from './author';

  
class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {

    declare id: CreationOptional<number>;
    declare title: string;
    declare publicationDate: CreationOptional<Date>
    declare genre?: NonAttribute<Genre>;
    declare genreId: ForeignKey<Genre['id']>
    declare editOffice: string;

    declare getAuthor: HasManyGetAssociationsMixin<Author>;
    declare addAuthor: HasManyAddAssociationMixin<Author, number>;
    declare addAuthors: HasManyAddAssociationsMixin<Author, number>;
    declare setAuthor: HasManySetAssociationsMixin<Author, number>;
    declare removeAuthor: HasManyRemoveAssociationMixin<Author, number>;
    declare removeAuthors: HasManyRemoveAssociationsMixin<Author, number>;
    declare hasAuthor: HasManyHasAssociationMixin<Author, number>;
    declare hasAuthors: HasManyHasAssociationsMixin<Author, number>;
    declare countAuthors: HasManyCountAssociationsMixin;
    declare createAuthor: HasManyCreateAssociationMixin<Author>;

    declare static associations: {
      authors: Association<Book, Author>,
      genre: Association<Book, Genre>
    };

    static associate(models: any){
      this.belongsTo(models.Genre, {
        foreignKey: 'genreId'
      });
      this.belongsToMany(models.Author, { through: models.AuthorBook,
                                          foreignKey: 'BookId' });
    }
}

function model(sequelize: any, types: any){
    Book.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        title: {
          type: new DataTypes.STRING(128),
          allowNull: false
        },
        publicationDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        editOffice: {
          type: new DataTypes.STRING(256),
          allowNull: true
        }
      },
      {
        tableName: 'books',
        sequelize,
        timestamps: false 
      }
    );
    return Book
}


export { Book, model };