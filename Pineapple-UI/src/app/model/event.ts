import {User} from './user';
import {Task} from './task';

export class Event {
    id: bigint;
    name: string;
    description: string;
    location: string;
    user: User;
    startTime: Date;
    endTime: Date;
    tasks: Task[];
}
