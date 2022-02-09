import { sign } from 'jsonwebtoken';
import { LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
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
  const tokenData = createToken(user);
  const cookie = createCookie(tokenData);
  return { cookie, user };
};

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const secretKey: string = process.env.AUTH_SECRET;
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};
