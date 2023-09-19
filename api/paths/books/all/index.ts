import express, { Request, Response } from 'express';
import db from '../../../../models';

let operations = {
    GET,
}

async function GET(req: Request, res: Response) {
    try{
        let books = await db.Book.findAll({
            include: db.Author
        });
        res.json(books)
    }catch(e){
        res.status(500).send()
    }
}

GET.apiDoc = {
    summary: "Fetch list of books.",
    operationId: "getBooks",
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
      }
    },
}

export default operations;