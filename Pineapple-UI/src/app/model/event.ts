import {User} from './user';
import {Task} from './task';
import {Time} from '@angular/common';

export class Event {
    id: bigint;
    name: string;
    description: string;
    location: string;
    user: User;
    startDate: Date;
    startTime: Time;
    endDate: Date;
    endTime: Time;
    allDay: boolean;
    tasks: Task[];
}
