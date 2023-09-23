import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { UserData } from '.';

function generateToken(user: UserData){
    let token = jwt.sign({
        id: user.id
    }, process.env.API_SECRET, {
        expiresIn: 86400
    });
    return token;
}

export {generateToken};