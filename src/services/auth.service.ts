import { sign } from 'jsonwebtoken';
import { LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken } from '@interfaces/auth.interface';
import { User } from '@interfaces/user.interface';
import * as UserModal from '@models/user.model';
import { isEmpty } from '@utils/util';

export const signup = async (userData: UserModal.ICreatePayload): Promise<User> => {
  if (userData.password !== userData.password_verification) {
    throw new HttpException(422, 'Passwords do not match');
  }
  const findUser = await UserModal.findByEmail(userData.email);
  if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);
  return UserModal.create(userData);
};

export const login = async (userData: LoginUserDto): Promise<{ cookie: string; user: User }> => {
  if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
  const user = await UserModal.findByLoginCredentials(userData.username, userData.password);
  if (!user) throw new HttpException(409, 'Your login information is not correct. Please try again.');
  const token = createToken(user);
  const cookie = createCookie(token);
  return { cookie, user };
};

const createToken = (user: User) => {
  const secretKey = process.env.AUTH_SECRET;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1); // 1 day
  const dataStoredInToken: DataStoredInToken = {
    iss: 'gastro.wiki',
    exp: expirationDate.getUTCMilliseconds(),
    iat: new Date().getUTCMilliseconds(),
    given_name: user.given_name,
    family_name: user.family_name,
    preferred_username: user.username,
    sub: user.id,
    languages: user.languages,
  };

  return sign(dataStoredInToken, secretKey);
};

const createCookie = (token: string): string =>
  process.env.NODE_ENV === 'production'
    ? `Authorization=${token}; HttpOnly; Max-Age=86400; Secure; SameSite=Strict`
    : `Authorization=${token}; HttpOnly; Max-Age=86400`;
