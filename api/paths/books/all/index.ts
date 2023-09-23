import express, { Request, Response } from 'express';
import db from '../../../../models';
import { header } from 'express-validator';

let operations = {
    GET,
}

async function GET(req: Request, res: Response) {
    try{
        let books = await db.Book.findAll({
            include: db.Author
        });
        if (!books){
          res.status(404).send();
        }
        res.json(books)
    }catch(e){
        res.status(500).send()
    }
}

GET.apiDoc = {
    summary: "Fetch list of books.",
    operationId: "getBooks",
    parameters: [
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
        description: "List of books.",
        schema: {
          type: "array",
          items: {
            $ref: "#/definitions/BookAndAuthors",
          },
        },
      },
      500: {
        description: "Internal Server Error"
      },
      404: {
        description: "Not Found"
      }
    },
}

export default operations;