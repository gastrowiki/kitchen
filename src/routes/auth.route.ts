import { Router } from 'express';
import { signUp, logIn } from '@controllers/auth.controller';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import validationMiddleware from '@middlewares/validation.middleware';

import authMiddleware from '@middlewares/auth.middleware';

const AuthRouter = Router();
AuthRouter.post('/signup', validationMiddleware(CreateUserDto, 'body'), signUp);
AuthRouter.post('/login', validationMiddleware(LoginUserDto, 'body'), logIn);
AuthRouter.get('/protect', authMiddleware, (_, res) => {
  res.json({ message: 'protected route!' });
});

export default AuthRouter;
