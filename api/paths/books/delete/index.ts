import express, { Request, Response } from 'express';
import db from '../../../../models';


let operations = {
    DELETE,
}

async function DELETE(req: Request, res: Response) {
    try{
       await db.Book.destroy({
        where: {
            id: Number(req.params.id)
        }
       })
       res.send(`Book with id ${req.params.id} is destroyed.`)
    }catch(e){
       res.status(404).send();
    }
}

DELETE.apiDoc = {
    summary: "Delete book(admin role required).",
    operationId: "deleteBook",
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
        description: "Deleted",
        schema: {
            type: "string",
          },
      },
      404: {
        description: "Not Found"
      }
    },
}

export default operations;