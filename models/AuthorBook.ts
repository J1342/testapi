import { Author } from './author';
import { Book } from './book';
import {
  Model, InferAttributes, InferCreationAttributes, ForeignKey, CreationOptional
  } from 'sequelize';

  class AuthorBook extends Model<InferAttributes<AuthorBook>, InferCreationAttributes<AuthorBook>>{
    declare AuthorId: ForeignKey<Author['id']>
    declare BookId: ForeignKey<Book['id']>
  }

function model(sequelize: any, DataTypes: any){
    AuthorBook.init({
        AuthorId: {
        type: DataTypes.INTEGER,
        },
        BookId: {
        type: DataTypes.INTEGER,
        }
    },
    {
        timestamps: false,
        sequelize,
        tableName: 'author_book'
    });

    return AuthorBook
}

export { AuthorBook, model }