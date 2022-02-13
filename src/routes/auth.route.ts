import { Router } from 'express';
import { signUp, logIn, forgotPassword, resetPassword, usernameAvailability } from '@controllers/auth.controller';
import { CreateUserDto, LoginUserDto, ResetPasswordDto, UsernameAvailabilityDto, ForgotPasswordDto } from '@dtos/users.dto';
import validationMiddleware from '@middlewares/validation.middleware';

const AuthRouter = Router();
AuthRouter.post('/signup', validationMiddleware(CreateUserDto, 'body'), signUp);
AuthRouter.post('/login', validationMiddleware(LoginUserDto, 'body'), logIn);
AuthRouter.get('/username-availability', validationMiddleware(UsernameAvailabilityDto, 'query'), usernameAvailability);
AuthRouter.post('/forgot-password', validationMiddleware(ForgotPasswordDto, 'body'), forgotPassword);
AuthRouter.post('/reset-password', validationMiddleware(ResetPasswordDto, 'body'), resetPassword);

export default AuthRouter;
