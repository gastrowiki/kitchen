import { Router } from 'express';
import { signUp, logIn, usernameAvailability } from '@controllers/auth.controller';
import { CreateUserDto, LoginUserDto, UsernameAvailabilityDto } from '@dtos/users.dto';
import validationMiddleware from '@middlewares/validation.middleware';

const AuthRouter = Router();
AuthRouter.post('/signup', validationMiddleware(CreateUserDto, 'body'), signUp);
AuthRouter.post('/login', validationMiddleware(LoginUserDto, 'body'), logIn);
AuthRouter.get('/usernameAvailability', validationMiddleware(UsernameAvailabilityDto, 'query'), usernameAvailability);

export default AuthRouter;
