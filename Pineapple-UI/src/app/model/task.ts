import {Event} from './event';

export interface Task {

  id: bigint;
  title: string;
  description: string;
  event: Event;
}
