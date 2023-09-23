import express, { Request, Response } from 'express';
import db from '../../../models';

let operations = {
    GET
}

async function GET(req: Request, res: Response) {
    try{
        let genre = await db.Genre.findByPk(req.params.id, {
            include:{
               model: db.Book,
               as: 'books'
            } 
        })
        if (!genre){
          res.status(404).send();
        }
        res.json(genre);
    }catch(e){
        res.status(500).send();
    }
}


GET.apiDoc = {
    summary: "Fetch one genre.",
    operationId: "fetchOneGenre",
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
        description: "Fetch one genre",
        schema: {
            type: "object",
            $ref: "#/definitions/Genre",

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