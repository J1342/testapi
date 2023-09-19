import express, { Request, Response } from 'express';
import db from '../../../../models';

let operations = {
    GET
}

async function GET(req: Request, res: Response) {
    try{
        let genres = await db.Genre.findAll({
            include: { 
            model: db.Book,
            as: 'books'
        }
        });
        res.json(genres);
    }catch(e){
        res.status(500).send();
    }
}

GET.apiDoc = {
    summary: "Fetch list of genres.",
    operationId: "getGenres",
    responses: {
      200: {
        description: "List of genres.",
        schema: {
          type: "array",
          items: {
            $ref: "#/definitions/Genre",
          },
        },
      },
    },
  };

export default operations;