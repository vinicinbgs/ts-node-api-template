import UsersRepository, { IUserRepository } from '../../repositories/UsersRepository';
import UserPostgresRepository from '../../repositories/postgres/UsersPostgresRepository';
import { User } from '../../models/User';
import { generateToken } from '../../libs/jwt';
import { hash } from '../../libs/encrypt';

class RegisterService {
  execute = async (data: User): Promise<string> => {
    const repository = this.#setRepository(new UserPostgresRepository());

    data.password = await hash(data.password);

    const userRegistered = await repository.add(data);

    return generateToken(userRegistered as User);
  };

  #setRepository = (repository: IUserRepository): IUserRepository => {
    return new UsersRepository(repository);
  };
}

export default RegisterService;
