import express, { Request, Response } from 'express';
import db from '../../../models';

let operations = {
    GET,
    POST,
    PUT,
    DELETE,
}

async function GET(req: Request, res: Response) {
    console.log("hellosds")
    try{
        let book = await db.Book.findByPk(req.params.id, {
            include: db.Author
        })
        res.json(book)
    }catch(e){
        res.status(404).send()
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
      }
    },
}

POST.apiDoc = {
    summary: "Create book.",
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
    summary: "Update book.",
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
    summary: "Delete book.",
    operationId: "deleteBook",
    consumes: ["application/json"],
    parameters: [
      {
        in: "query",
        name: "id",
        type: "number"
      },
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