import validator from 'express-validator';
import {check, validationResult} from 'express-validator';
import db from '../models';


const loginValidation = [
    check("username", "username is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
];

async function loginMiddleware(req: Request, res: Response, next: CallableFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next()
}

export { loginValidation, loginMiddleware };