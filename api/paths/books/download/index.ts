import express, { Request, Response } from 'express';
import db from '../../../../models';


let operations = {
    GET
}

async function GET(req: Request, res: Response){
    res.download(`${__dirname}/download.txt`)
}

GET.apiDoc = {
    summary: "Download book.",
    operationId: "downloadBook",
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
        description: "File of book.",
      },
    },
}

export default operations;