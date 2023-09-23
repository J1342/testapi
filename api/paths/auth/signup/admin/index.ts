import express, { Request, Response } from 'express';
import db from '../../../../../models';
import { UserTypes } from '../../../../../user';
import register from '../../../../../auth/register'


let operations = {
    POST
}

async function POST(req: Request, res: Response){
    let user = await register(req.body.username, req.body.password, req.body.email,
                                     UserTypes.admin, db)
    res.json(user)
}

POST.apiDoc = {
    summary: "Sign up.",
    operationId: "signUp",
    consumes: ["application/json"],
    parameters: [
      {
        in: "body",
        name: '',
        schema: {
          $ref: "#/definitions/SignUpData"
        }
      },
    ],
    responses: {
      200: {
        description: "Signed Up",
        schema: {
            type: "object",
            $ref: "#/definitions/User",

          },
      },
      422: {
        description: "Auth errors",
        schema: {
            type: "object",
            $ref: "#/definitions/AuthErrors",

          },
      }
    },
}

export default operations;