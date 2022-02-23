import { Router } from 'express';
import { signUp, logIn, logOut, getUserProfile, forgotPassword, resetPassword, usernameAvailability } from '@controllers/auth.controller';
import { CreateUserDto, LoginUserDto, ResetPasswordDto, UsernameAvailabilityDto, ForgotPasswordDto } from '@dtos/users.dto';
import { validateRequestData, verifyUser } from 'middlewares';

const AuthRouter = Router();
AuthRouter.get('/logout', verifyUser, logOut);
AuthRouter.get('/me', verifyUser, getUserProfile);
AuthRouter.get('/username-availability', validateRequestData(UsernameAvailabilityDto, 'query'), usernameAvailability);
AuthRouter.post('/forgot-password', validateRequestData(ForgotPasswordDto, 'body'), forgotPassword);
AuthRouter.post('/login', validateRequestData(LoginUserDto, 'body'), logIn);
AuthRouter.post('/reset-password', validateRequestData(ResetPasswordDto, 'body'), resetPassword);
AuthRouter.post('/signup', validateRequestData(CreateUserDto, 'body'), signUp);

export default AuthRouter;
