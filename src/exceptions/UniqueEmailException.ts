import BaseException from './BaseException';
class UniqueEmailException extends BaseException {
  constructor(message: string, contexts: object) {
    super(message, contexts);

    this.type = 'response';
    this.status = 409;
    this.finalMessage = 'This email already exists, please choose another one';
  }
}

export default UniqueEmailException;
