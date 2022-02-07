import { Router } from 'express';
import { signUp, logIn } from '@controllers/auth.controller';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import validationMiddleware from '@middlewares/validation.middleware';

const AuthRouter = Router();
AuthRouter.post('/signup', validationMiddleware(CreateUserDto, 'body'), signUp);
AuthRouter.post('/login', validationMiddleware(LoginUserDto, 'body'), logIn);

export default AuthRouter;
