import express, { Request, Response } from 'express';
let router = express.Router();


const operations = {
    GET
}

async function GET(req: Request, res: Response){
    res.send(
        `
        <html>
           <head>
           </head>
           <body>
                <h1>Sign in</h1>
                <a class="button google" href="/oauth/login/federated/google">
                Sign in with Google</a>
           </body>
        </html>
        `
    )
}

GET.apiDoc = {
    summary: "Oauth providers authentication.",
    operationId: "getOauthToken",
    consumes: ["application/json"],
    responses: {
      200: {
        description: "Access granted",
        schema: {
            type: "object",
            $ref: "#/definitions/User",
          },
      },
      422: {
        description: "Auth error",
        schema: {
            type: "object",
            $ref: "#/definitions/AuthenticationError"
        }
      }
    },
}

export default operations;