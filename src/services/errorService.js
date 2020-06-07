import { Subject } from 'rxjs';

const subject = new Subject();

export const errorService = {
  reportError: message => subject.next(message),
  clearErrors: () => subject.next(),
  onError: () => subject.asObservable()
};