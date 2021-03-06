import isEmpty from 'lodash/isEmpty';
import { createHash } from 'crypto';
import { sign } from 'jsonwebtoken';

import * as UserModal from './users.model';
import TOP_PASSWORDS from './enums/TOP_PASSWORDS';
import { HttpException } from 'common';
import { IDataStoredInToken, IUser } from 'common/types';
import { LoginUserDto, ResetPasswordDto } from './users.dto';

export const signup = async (userData: UserModal.ICreatePayload) => {
  // most of the validation is done in users.dto.ts
  if (TOP_PASSWORDS.includes(userData.password)) {
    throw new HttpException(422, 'Password is too common', { password: 'Password is too common' });
  }
  const findUser = await UserModal.findByEmail(userData.email);
  if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);
  const user = await UserModal.create(userData);
  const token = createToken(user);
  return { token, user };
};

export const login = async (userData: LoginUserDto) => {
  if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
  const user = await UserModal.findByLoginCredentials(userData.username, userData.password);
  if (!user) throw new HttpException(409, 'Your login information is not correct. Please try again.');
  const token = createToken(user);
  return { token, user };
};

const createToken = (user: IUser) => {
  const secretKey = process.env.JWT_SECRET;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1); // 1 day
  const dataStoredInToken: IDataStoredInToken = {
    iss: 'gastro.wiki',
    sub: user.id,
    exp: expirationDate.getTime(),
    iat: new Date().getTime(),
    email: user.email,
    family_name: user.family_name,
    favorite_count: user.favorite_count,
    given_name: user.given_name,
    languages: user.languages,
    middle_name: user.middle_name,
    picture: user.picture,
    username: user.username,
  };
  return sign(dataStoredInToken, secretKey);
};

export const usernameAvailability = async (username: string) => {
  const user = await UserModal.findByUsername(username);
  if (user) throw new HttpException(409, `The username ${username} already exists`);
  return true;
};

const generateResetToken = () => {
  const buf = Buffer.alloc(16);
  for (let i = 0; i < buf.length; i++) {
    buf[i] = Math.floor(Math.random() * 256);
  }
  const id = buf.toString('base64');
  return createHash('md5').update(id).digest('hex');
};

export const forgotPassword = async (email: string) => {
  const user = await UserModal.findByEmail(email);
  if (!user) throw new HttpException(404, `${email} isn't in our system. Try creating an account!`);
  const resetToken = generateResetToken();
  UserModal.addResetToken(user.id, resetToken);
  return resetToken;
};

export const resetPassword = async ({ email, password, token }: ResetPasswordDto) => {
  if (TOP_PASSWORDS.includes(password)) {
    throw new HttpException(422, 'Password is too common', { password: 'Password is too common' });
  }
  const user = await UserModal.findByEmail(email);
  if (!user || token !== user.reset_password_token) throw new HttpException(404, 'This reset link is not valid. Try again.');
  const expiredToken = new Date().getTime() > user.reset_token_expires_at.getTime();
  if (expiredToken) throw new HttpException(409, 'This reset link is expired. Try again.');
  return UserModal.updatePassword(user.id, password);
};
