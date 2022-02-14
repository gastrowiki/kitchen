import { Request } from 'express';
import { User } from '@interfaces/user.interface';

export interface DataStoredInToken {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  given_name: string;
  family_name: string;
  preferred_username: string;
  languages: string[];
}

export interface RequestWithUser extends Request {
  user: User;
}
