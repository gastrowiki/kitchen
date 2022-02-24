import passport from 'passport';
import { Request } from 'express';
import { Strategy as JwtStrategy } from 'passport-jwt';

import * as UserModel from 'users/users.model';
import { IDataStoredInToken } from 'common/types';

const jwtFromRequest = (req: Request) => {
  if (req.cookies.Authorization) {
    return req.cookies.Authorization;
  }
  const authorization = req.headers.authorization as string;
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest,
      secretOrKey: process.env.JWT_SECRET,
      issuer: 'gastro.wiki',
      ignoreExpiration: true,
    },
    async (jwt_payload: IDataStoredInToken, done) => {
      try {
        const user = await UserModel.findById(jwt_payload.sub);
        return done(null, user || false);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

export const verifyUser = passport.authenticate('jwt', { session: false });
