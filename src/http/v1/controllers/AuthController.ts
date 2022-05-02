import { Request, Response, NextFunction } from 'express';
import { User } from '../../../models/User';
import { registerResponse, authResponse } from '../responses/AuthResponse';
import AuthValidator from '../validators/AuthValidator';
import RegisterService from '../../../services/users/RegisterService';
import AuthenticateService from '../../../services/users/AuthenticateService';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const registerService = new RegisterService();

    const { email, password } = new AuthValidator().registerValidation(req);

    const token = await registerService.execute({
      email,
      password,
    } as User);

    return registerResponse({
      res,
      status: 200,
      params: {
        email: email,
        token,
      },
    });
  } catch (e) {
    next(e);
  }
};

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authenticateService = new AuthenticateService();

    const { email, password } = new AuthValidator().authValidation(req);

    const token = await authenticateService.execute({
      email,
      password,
    } as User);

    return authResponse({
      res,
      status: 200,
      params: {
        email: email,
        token,
      },
    });
  } catch (e) {
    next(e);
  }
};

export { register, auth };
