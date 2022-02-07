import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/user.interface';
import * as AuthService from '@services/auth.service';

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: CreateUserDto = req.body;
    const signUpUserData: User = await AuthService.signup(userData);

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
