import validator from 'express-validator';
import {check, validationResult} from 'express-validator';
import db from '../models';


const registrationValidation = [
    check("username", "username is required").not().isEmpty().isLength({min: 3}).withMessage("username must be at least 3 characters long"),
    check("email", "email is required").not().isEmpty().isEmail().withMessage("email is invalid"),
    check("password", "password is required").not().isEmpty().isLength({min: 6}).withMessage("password must be at least 6 characters long"),
    check("confirmPassword", "password confirmation is required").not().isEmpty().custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }
    )
];

async function registerMiddleware(req: Request, res: Response, next: CallableFunction) { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let potentialUser = await db.User.findOne({
        where: {
            username: req.body.username
        }
    });
    if(potentialUser) {
        return res.status(422).json({
            message: 'user already exists',
            error: true
        });
    }
        next();
}

export { registrationValidation, registerMiddleware };