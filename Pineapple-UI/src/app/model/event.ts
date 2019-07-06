import {User} from './user';

export class Event {
  name: string;
  description: string;
  location: string;
  user: User;
  startTime: Date;
  endTime: Date;
}
