import passport from 'passport';
import LocalStrategy from 'passport-local';
import db from '../models';
import crypto from 'crypto';
import express, { Request, Response } from 'express';
import operationsSignIn from '../api/paths/auth/signin';
import operationsAdminSignUp from '../api/paths/auth/signup/admin';
import operationsUserSignUp from '../api/paths/auth/signup/user';
import { generateToken } from '../user/utils';
import pbkdf2Async from '../auth/utils';
import { registrationValidation, registerMiddleware }
         from '../middlewares/registration_middleware';
import { loginValidation, loginMiddleware } from '../middlewares/login_middleware';


const router = express.Router()

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    let user = null;
    let dbuser = null;
    let error = {
        error: true,
        message: "Incorrect username or password.",
    }
    try{
        dbuser = await db.User.findOne({
            where: {
                username: username
            }
        })
        if (dbuser){
            let token = generateToken(dbuser)
            user = {
                id: dbuser.id,
                email: dbuser.email,
                username: dbuser.username,
                token: token,
                message: 'user authenticated',
                error: false 
            }
        }else{
            return cb(null, error)
        }
    }catch(e){
        return cb(null, error);
    }
    let hashedPassword = await pbkdf2Async(password, new Buffer(dbuser.salt, 'hex'));
    if (!hashedPassword){
        return cb(null, error)
    }
    if (!crypto.timingSafeEqual(new Buffer(dbuser.password, 'hex'), hashedPassword)) {
        return cb(null, error);
    }
    return cb(null, user);
}));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, user);
    });
  });
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

router.post('/signup/admin/', registrationValidation,
            registerMiddleware, operationsAdminSignUp.POST);
router.post('/signup/user/', registrationValidation,
            registerMiddleware, operationsUserSignUp.POST);
router.post('/signin/', loginValidation,
            loginMiddleware, passport.authenticate('local',
 { failureRedirect: '/login', failureMessage: true }), operationsSignIn.POST);

export default router;

