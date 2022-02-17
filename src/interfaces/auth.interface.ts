import { Request } from 'express';
import { User } from '@interfaces/user.interface';

export interface DataStoredInToken {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  email: string;
  given_name: string;
  family_name: string;
  languages: string[];
  username: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
