import BaseFirebaseRepository from './BaseFirebaseRepository';
import { Contact } from '../../models/Contact';
import { IContactsRepository } from '../ContactsRepository';

class ContactsFirebaseRepository extends BaseFirebaseRepository implements IContactsRepository {
  constructor() {
    const collection = 'contacts';
    super(collection);
  }

  get = async (userId: string): Promise<Contact[]> => {
    const results = await this.queryBuilder.where('user_id', '==', userId).get();
    const contacts = [];

    results.forEach((contact) => {
      contacts.push(contact.data());
    });

    return contacts;
  };

  add = async (data: Contact): Promise<Contact> => {
    const result = await this.queryBuilder.add(data);
    const contact = (await result.get()).data() as Contact;

    return contact;
  };
}

export default ContactsFirebaseRepository;
