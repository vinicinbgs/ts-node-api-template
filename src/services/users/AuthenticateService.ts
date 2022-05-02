import UsersRepository, { IUserRepository } from '../../repositories/UsersRepository';
import UserPostgresRepository from '../../repositories/postgres/UsersPostgresRepository';
import { User } from '../../models/User';
import { generateToken } from '../../libs/jwt';
import { compare } from '../../libs/encrypt';
import AuthException from '../../exceptions/AuthException';

class AuthenticateService {
  execute = async (data: User): Promise<string> => {
    const { email, password } = data;

    const repository = this.#setRepository(new UserPostgresRepository());

    const user = await repository.getByEmail(email);

    if (!user) {
      throw new AuthException(user);
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AuthException(user);
    }

    delete user.password;

    return generateToken(user as User);
  };

  #setRepository = (repository: IUserRepository): IUserRepository => {
    return new UsersRepository(repository);
  };
}

export default AuthenticateService;
