import { UserData } from '../user';
import { generateToken } from '../user/utils';
import pbkdf2Async from './utils';
import crypto from 'crypto';


async function register(username: string, password: string,
    email: string | null = null,
    role: string, db: any): Promise<UserData>{
    let salt = crypto.randomBytes(16);
    let user: UserData | null = null;
    let hashedPassword = await pbkdf2Async(password, salt);
    if (!hashedPassword){
    user = {
        error: true,
        message: 'password error',
    }
    }
    try{
        let dbuser = await db.User.create({
            username: username,
            password: hashedPassword.toString('hex'),
            email: email ? email: '',
            salt: salt.toString('hex'),
            role: role
        })
        let token = generateToken(dbuser);
        user = {
            id: dbuser.id,
            email: dbuser.email,
            username: dbuser.username,
            token: token,
            message: 'user created',
            error: false 
        }
    }catch(e){
        user = {
            error: true,
            message: "user wasn't created",
        }
    }

    return user
}

export default register;