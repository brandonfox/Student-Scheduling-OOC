import {User} from './user';
import {Event} from './event';

export interface UserGroup {
    id: bigint;
    name: string;
    description: string;
    users: User[];
    events: Event[];
}
