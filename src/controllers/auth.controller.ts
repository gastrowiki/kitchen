import { NextFunction, Request, Response } from 'express';
import acceptLanguageHeaderParser from 'accept-language-parser';

import * as AuthService from '@services/auth.service';
import { CreateUserDto, LoginUserDto, ResetPasswordDto } from '@dtos/users.dto';
import { User } from '@interfaces/user.interface';
import { lowercaseCredentials } from '@utils/password';

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: CreateUserDto = lowercaseCredentials(req.body);
    const languages: string[] = acceptLanguageHeaderParser.parse(req.headers['accept-language']).map(lang => lang.code);
    if (languages.length === 0) {
      languages.push('en');
    }
    const signUpUserData: User = await AuthService.signup({ ...userData, languages });
    res.status(201).json(signUpUserData);
  } catch (error) {
    next(error);
  }
};

export const logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: LoginUserDto = lowercaseCredentials(req.body);
    const { cookie, user } = await AuthService.login(userData);
    res.setHeader('Set-Cookie', [cookie]);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const usernameAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const username = req.query.username as string;
    await AuthService.usernameAvailability(username.toLowerCase());
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = lowercaseCredentials(req.body);
    const resetToken = await AuthService.forgotPassword(email);
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?email=${email}&token=${resetToken}`;
    console.log(resetUrl);
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resetInfo: ResetPasswordDto = lowercaseCredentials(req.body);
    await AuthService.resetPassword(resetInfo);
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
