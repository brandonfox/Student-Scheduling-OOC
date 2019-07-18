import {User} from './user';
import {Event} from './event';

export class Group {

    id: bigint;
    name: string;
    description: string;
    user: User[];
    event: Event[];

}
