import express, { Request, Response } from 'express';
import db from '../../../models';

let operations = {
    GET
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

export default operations;