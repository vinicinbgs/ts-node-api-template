import { v1_ContactsController } from '../../../../../src/http/v1/controllers';
import { Request, Response } from 'express';
import { hash } from '../../../../../src/libs/encrypt';
import ContactsRepository from '../../../../../src/repositories/ContactsRepository';
import { faker } from '@faker-js/faker';
import ValidationException from '../../../../../src/exceptions/ValidationException';

jest.mock('../../../../../src/repositories/ContactsRepository');

const mockPayload = {
  address: 'address',
  first_name: 'first_name',
  last_name: 'last_name',
  phone_number: 'phone_number',
};

const mockContactsRepository = ContactsRepository as jest.Mock;

const mockResponse: Partial<Response> = {
  status: function () {
    return this;
  },
  send: function (data: any) {
    return data;
  },
};

const mockNext = jest.fn();

describe('ContactsController', () => {
  beforeEach(async () => {
    mockContactsRepository.mockImplementation(() => {
      return {
        add: () => mockPayload,
        get: () => {
          return [mockPayload];
        },
      };
    });
  });

  it('should store contact successfully', async () => {
    const payload = {
      body: mockPayload,
    } as Request;

    const response = await v1_ContactsController.store(payload, mockResponse as Response, mockNext);

    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('result');
  });

  it('should list all contacts successfully', async () => {
    const payload = {
      body: mockPayload,
    } as Request;

    const response = await v1_ContactsController.all(payload, mockResponse as Response);

    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('results');
  });

  // it('should throw ValidationException when the user try auth with empty email/password', async () => {
  //   const payload = {
  //     body: {
  //       email: '',
  //       password: '',
  //     },
  //   } as Request;

  //   await v1_AuthController.auth(payload, mockResponse as Response, mockNext);

  //   const validationException = () => {
  //     throw new ValidationException([]);
  //   };

  //   expect(validationException).toThrow(ValidationException);
  // });

  // it('should throw ValidationException when the user try register with empty email/password', async () => {
  //   const payload = {
  //     body: {
  //       email: '',
  //       password: '',
  //     },
  //   } as Request;

  //   await v1_AuthController.register(payload, mockResponse as Response, mockNext);

  //   const validationException = () => {
  //     throw new ValidationException([]);
  //   };

  //   expect(validationException).toThrow(ValidationException);
  // });
});
