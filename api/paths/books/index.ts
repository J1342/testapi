import express, { Request, Response } from 'express';
import db from '../../../models';

let operations = {
    GET,
    POST,
    PUT,
    DELETE,
}

async function GET(req: Request, res: Response) {
    try{
        let book = await db.Book.findByPk(req.params.id, {
            include: db.Author
        })
        if (!book){
           res.status(404).send();
        }
        res.json(book)
    }catch(e){
        res.status(500).send()
    }
}

async function POST(req: Request, res: Response) {
    try{
        let book = await db.Book.create(req.body, {
            include: [db.Author]
        });
        if ('authors' in req.body){
            for (let author of req.body.authors){
                let authorItem = await db.Author.create(author);
                await book.addAuthor(authorItem);
            }
        }
        book = await db.Book.findAll({
            where: {
                id: book.id
            },
            include: db.Author
        })
        res.json(book);
    }catch(e){
        res.status(400).send()
    }
}

async function PUT(req: Request, res: Response) {
    try{
      let book = await db.Book.findByPk(req.params.id);
      for (let key in req.body){
         if(key != 'id'){
            book[key] = req.body[key]
         }
      }
      book.save()
      res.json(book);
    }catch(e){
      res.status(400).send();
    }
}

async function DELETE(req: Request, res: Response) {
    try{
       await db.Book.destroy({
        where: {
            id: Number(req.params.id)
        }
       })
       res.send(`Book with id ${req.params.id} is destroyed.`)
    }catch(e){
       res.status(404).send();
    }
}

GET.apiDoc = {
    summary: "Fetch one book.",
    operationId: "fetchOneBook",
    consumes: ["application/json"],
    parameters: [
      {
        in: "query",
        name: "id",
        type: "number"
      },
      {
        name: "Authorization",
        in: "header",
        description: "JWT access token",
        required: true,
        type: "string"
      }
    ],
    responses: {
      200: {
        description: "Fetch one book",
        schema: {
            type: "object",
            $ref: "#/definitions/BookAndAuthors",

          },
      },
      404: {
        description: "Not Found"
      },
      500: {
        description: "Server error"
      }
    },
}

POST.apiDoc = {
    summary: "Create book(admin role required).",
    operationId: "createBook",
    consumes: ["application/json"],
    parameters: [
      {
        in: "body",
        name: '',
        schema: {
          $ref: "#/definitions/BookAndAuthors"
        }
      },
      {
        name: "Authorization",
        in: "header",
        description: "JWT access token",
        required: true,
        type: "string"
      }
    ],
    responses: {
      200: {
        description: "Created",
        schema: {
            type: "object",
            $ref: "#/definitions/BookAndAuthors",

          },
      },
      400: {
        description: "Bad Request"
      }
    },
}

PUT.apiDoc = {
    summary: "Update book(admin role required).",
    operationId: "updateBook",
    consumes: ["application/json"],
    parameters: [
      {
        in: "query",
        name: "id",
        type: "number"
      },
      {
        in: "body",
        name: '',
        schema: {
          $ref: "#/definitions/Book"
        }
      },
      {
        name: "Authorization",
        in: "header",
        description: "JWT access token",
        required: true,
        type: "string"
      }
    ],
    responses: {
      200: {
        description: "Updated",
        schema: {
            type: "object",
            $ref: "#/definitions/Book"
          },
      },
      400: {
        description: "Bad Request"
      }
    },
}

DELETE.apiDoc = {
    summary: "Delete book(admin role required).",
    operationId: "deleteBook",
    consumes: ["application/json"],
    parameters: [
      {
        in: "query",
        name: "id",
        type: "number"
      },
      {
        name: "Authorization",
        in: "header",
        description: "JWT access token",
        required: true,
        type: "string"
      }
    ],
    responses: {
      200: {
        description: "Deleted",
        schema: {
            type: "string",
          },
      },
      404: {
        description: "Not Found"
      }
    },
}

export default operations;