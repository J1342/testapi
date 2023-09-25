import db from '../models';
import { UserTypes } from '../user';


async function accessLevelMiddleware(req: Request, res: Response, next: CallableFunction) {
    if ('user' in req  && req.user.role == UserTypes.admin){
        next()
    }else{
        return res.status(422).json({ error: "admin acess required" });
    }
}

export { accessLevelMiddleware };