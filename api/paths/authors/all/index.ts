import express, { Request, Response } from 'express';
import db from '../../../../models';


let operations = {
    GET
}

async function GET(req: Request, res: Response) {
    try{
        let authors = await db.Author.findAll({
            include: db.Book
        });
        if (!authors){
          res.status(404).send();
        }
        res.json(authors);
    }catch(e){
        res.status(500).send();
    }
}

GET.apiDoc = {
    summary: "Fetch list of authors.",
    operationId: "getAuthors",
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
        description: "List of authors.",
        schema: {
          type: "array",
          items: {
            $ref: "#/definitions/AuthorAndBooks",
          },
        },
      },
      500: {
        description: "Internal Server Error"
      },
      404: {
        description: "Not found"
      }
    },
}

export default operations;