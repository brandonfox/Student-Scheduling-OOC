import {User} from './user';

export class Event {
    id: bigint;
    name: string;
    description: string;
    location: string;
    user: User;
    startTime: Date;
    endTime: Date;
}
