import ContactsRepository, { IContactsRepository } from '../../repositories/ContactsRepository';
import ContactsFirebaseRepository from '../../repositories/firebase/ContactsFirebaseRepository';

class ListContactsService {
  execute = async (userId: string) => {
    const repository = this.#setContactsRepository(new ContactsFirebaseRepository());

    return repository.get(userId);
  };

  #setContactsRepository(repository: IContactsRepository): ContactsRepository {
    return new ContactsRepository(repository);
  }
}

export default ListContactsService;
