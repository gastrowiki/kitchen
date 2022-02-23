import { Request } from 'express';
import { User } from '@interfaces/user.interface';

export interface DataStoredInToken {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  email: string;
  family_name: string;
  favorite_count?: number;
  given_name: string;
  languages: string[];
  middle_name?: string;
  picture?: string;
  username: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
