import ContactsRepository, { IContactsRepository } from '../../repositories/ContactsRepository';
import ContactsFirebaseRepository from '../../repositories/firebase/ContactsFirebaseRepository';
import { Contact } from '../../models/Contact';

class AddContactService {
  execute = async (contact: Contact) => {
    const repository = this.#setRepository(new ContactsFirebaseRepository());

    return await repository.add(contact);
  };

  #setRepository(repository: IContactsRepository): IContactsRepository {
    return new ContactsRepository(repository);
  }
}

export default AddContactService;
