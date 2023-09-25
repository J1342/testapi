import express, { Request, Response } from 'express';
import db from '../../../../models';


let operations = {
    PUT,
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

PUT.apiDoc = {
    summary: "Update book(admin role required).",
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

export default operations;