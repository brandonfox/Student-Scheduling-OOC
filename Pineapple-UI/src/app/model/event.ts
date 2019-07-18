import {User} from './user';
import {Task} from './task';
import {Time} from '@angular/common';
import { CalendarEvent } from 'angular-calendar';

export interface Event extends CalendarEvent {
    id: number;
    name: string;
    description: string;
    location: string;
    user: User;
    startDate: Date;
    start: Date;
    startTime: Time;
    endDate: Date;
    end: Date;
    endTime: Time;
    allDay: boolean;
    tasks: Task[];
}
