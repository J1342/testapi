import express, { Request, Response } from 'express';


let operations = {
    POST
}

function POST(req: Request, res: Response){
    res.json(req.user);
}

POST.apiDoc = {
    summary: "Sign in.",
    operationId: "signIn",
    consumes: ["application/json"],
    parameters: [
      {
        in: "body",
        name: '',
        schema: {
          $ref: "#/definitions/SignInData"
        }
      },
    ],
    responses: {
      200: {
        description: "Signed In",
        schema: {
            type: "object",
            $ref: "#/definitions/User",

          },
      },
      400: {
        description: "Bad Request"
      }
    },
}

export default operations;