import express, { Request, Response } from 'express';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oidc';
import db from '../models';
let router = express.Router();
import operations from '../api/paths/oauth/login';
import { generateToken } from '../user/utils';
import { UserTypes } from '../user';
require('dotenv').config()


passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth/redirect/google',
    scope: [ 'profile' ]
  }, async function verify(issuer, profile, cb){
        let user = null;
        let dbuser = null;
        let error = {
            error: true,
            message: "Authentication failed.",
        }
        try{
           let federated_credential = await db.FederatedCredential.findOne({
              where: {
                provider: issuer,
                subject: profile.id
              }
           })
           if (!federated_credential){
              dbuser = await db.User.create({
                 username: profile.displayName,
                 role: UserTypes.user
              })
              federated_credential = await db.FederatedCredential.create({
                user_id: dbuser.id,
                provider: issuer,
                subject: profile.id
              })
           }else{
              dbuser = await db.User.findOne({
                where: {
                   id: federated_credential.user_id
                }
              })
           }
           let token = generateToken(dbuser);
           user = {
              id: dbuser.id,
              email: dbuser.email,
              username: dbuser.username,
              token: token,
              message: 'user authenticated',
              error: false 
           }
           return cb(null, user);
        }catch(e){
          console.log(e);
          return cb(null, error)
        }
     })
)

router.get('/login/federated/google', passport.authenticate('google'));
router.get('/login', operations.GET)
router.get('/redirect/google', passport.authenticate('google', {
    failureRedirect: '/login'
}), async function(req, res){
    if (req.user.error){
      res.status(422).json(req.user);
    }else{
      res.json(req.user);
    }
});

export default router;