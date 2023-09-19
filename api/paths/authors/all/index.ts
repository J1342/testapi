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
        res.json(authors);
    }catch(e){
        res.status(500).send();
    }
}

GET.apiDoc = {
    summary: "Fetch list of authors.",
    operationId: "getAuthors",
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
      }
    },
}

export default operations;