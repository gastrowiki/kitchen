import { Router } from 'express';
import { signUp, logIn, logOut, getUserProfile, forgotPassword, resetPassword, usernameAvailability } from './users.controller';
import { CreateUserDto, LoginUserDto, ResetPasswordDto, UsernameAvailabilityDto, ForgotPasswordDto } from './users.dto';
import { validateRequestData, verifyUser } from 'middlewares';

export const UserRoutes = Router();

// public routes
UserRoutes.get('/logout', logOut);
UserRoutes.get('/username-availability', validateRequestData(UsernameAvailabilityDto, 'query'), usernameAvailability);
UserRoutes.post('/forgot-password', validateRequestData(ForgotPasswordDto, 'body'), forgotPassword);
UserRoutes.post('/login', validateRequestData(LoginUserDto, 'body'), logIn);
UserRoutes.post('/reset-password', validateRequestData(ResetPasswordDto, 'body'), resetPassword);
UserRoutes.post('/signup', validateRequestData(CreateUserDto, 'body'), signUp);

// private routes
UserRoutes.get('/me', verifyUser, getUserProfile);
