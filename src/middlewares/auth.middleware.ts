import passport from 'passport';
import { Request } from 'express'
import { Strategy as JwtStrategy } from 'passport-jwt';

import * as UserModel from '@models/user.model';
import { DataStoredInToken } from '@interfaces/auth.interface';

const jwtFromRequest = (req: Request) => {
  if (req.cookies.Authorization) {
    return req.cookies.Authorization;
  }
  const authorization = req.headers.authorization;
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest,
      secretOrKey: process.env.AUTH_SECRET,
      issuer: 'gastro.wiki',
      ignoreExpiration: true,
    },
    async (jwt_payload: DataStoredInToken, done) => {
      try {
        console.log(jwt_payload);
        const user = await UserModel.findById(jwt_payload.sub);
        return done(null, user || false);
      } catch (error) {
        console.log(error);
        return done(error, false);
      }
    },
  ),
);

export default passport.authenticate('jwt', { session: false });
