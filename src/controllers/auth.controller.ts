import { NextFunction, Request, Response } from 'express';
import acceptLanguageHeaderParser from 'accept-language-parser';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/user.interface';
import * as AuthService from '@services/auth.service';

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: CreateUserDto = req.body;
    const languages: string[] = acceptLanguageHeaderParser.parse(req.headers['accept-language']).map(lang => lang.code);
    if (languages.length === 0) {
      languages.push('en');
    }
    const signUpUserData: User = await AuthService.signup({ ...userData, languages });

    res.status(201).json({ data: signUpUserData, message: 'signup' });
  } catch (error) {
    next(error);
  }
};

export const logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: CreateUserDto = req.body;
    const { cookie, user } = await AuthService.login(userData);
    res.setHeader('Set-Cookie', [cookie]);
    res.status(200).json({ data: user, message: 'login' });
  } catch (error) {
    next(error);
  }
};
