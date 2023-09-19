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
        res.json(genre);
    }catch(e){
        console.log(e)
        res.status(404).send();
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
      }
    },
}


export default operations;