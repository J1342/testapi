import express, { Request, Response } from 'express';
import db from '../../../../models';


let operations = {
    POST
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

export default operations;