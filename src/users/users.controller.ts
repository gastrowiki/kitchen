import { NextFunction, Request, Response } from 'express';
import acceptLanguageHeaderParser from 'accept-language-parser';

import * as AddressService from './address.service';
import * as UsersService from './users.service';
import { CreateUserDto, LoginUserDto, ResetPasswordDto } from './users.dto';
import { IRequestWithUser } from 'common/types';
import { lowercaseCredentials, pickUserProfileAttributes } from './users.utils';

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: CreateUserDto = lowercaseCredentials(req.body);
    const languages: string[] = acceptLanguageHeaderParser.parse(req.headers['accept-language']).map(lang => lang.code);
    if (languages.length === 0) {
      languages.push('en');
    }
    console.log(languages, req.headers['accept-language']);
    const { token, user } = await UsersService.signup({ ...userData, languages });
    res.cookie('Authorization', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: LoginUserDto = lowercaseCredentials(req.body);
    const { token, user } = await UsersService.login(userData);
    res.cookie('Authorization', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logOut = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.clearCookie('Authorization');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export const usernameAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const username = req.query.username as string;
    await UsersService.usernameAvailability(username.toLowerCase());
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = lowercaseCredentials(req.body);
    const resetToken = await UsersService.forgotPassword(email);
    const resetUrl = `${process.env.FRONTEND_URL}:${process.env.PORT}/reset-password?email=${email}&token=${resetToken}`;
    console.log(resetUrl);
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resetInfo: ResetPasswordDto = lowercaseCredentials(req.body);
    await UsersService.resetPassword(resetInfo);
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req: IRequestWithUser, res: Response, next: NextFunction): Promise<void> => {
  try {
    const profile = pickUserProfileAttributes(req.user);
    if (req.user.legal_address_id) {
      const address = await AddressService.findById(req.user.legal_address_id);
      profile.address = address;
    }
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};
