import ListContactsServices from '../../../services/contacts/ListContactsService';
import AddContactService from '../../../services/contacts/AddContactService';

import { Response, Request, NextFunction } from 'express';
import ContactValidator from '../validators/ContactValidator';
import { allResponse, addResponse } from '../responses/ContactResponse';

const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, address, first_name, last_name, phone_number, created_at, updated_at } =
      new ContactValidator().storeValidation(req);

    const addContactService = new AddContactService();

    const contact = await addContactService.execute({
      address,
      first_name,
      last_name,
      phone_number,
      user_id,
      created_at,
      updated_at,
    });

    return addResponse({
      res,
      status: 200,
      params: contact,
    });
  } catch (error) {
    next(error);
  }
};

const all = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  const listContactsServices = new ListContactsServices();

  const contacts = await listContactsServices.execute(user_id);

  return allResponse({
    res,
    status: 200,
    params: contacts,
  });
};

export { store, all };
