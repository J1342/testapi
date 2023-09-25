import jwt from 'jsonwebtoken';
import db from '../models';
import {Request, Response} from 'express';
import { verify } from 'crypto';


async function verifyToken(req: Request, res: Response, next: CallableFunction){
    if (req.headers &&
        req.headers.authorization && 
        req.headers.authorization.split(' ')[0] === 'Bearer'){
            jwt.verify(req.headers.authorization.split(' ')[1],
                       process.env.API_SECRET, async function (err, decode){
                           if (err) {
                            req.user = undefined
                           }
                           try{
                             let user = await db.User.findOne({
                                where: {
                                    id: decode.id
                                }
                             })
                             req.user = user;
                             next();
                           }catch(e){
                            res.status(500).send('error');
                           }
                       })
    }else{
        res.status(500).send('error');
    }
}

export default verifyToken;