import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import { Event} from '../model/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  currentEvent: Event | null;

  constructor(
    private authService: AuthenticationService,
  ) {
  }

  private eventUrl = 'http://localhost:8080/events';
  public getEvents(): Promise<Event[]> {
    return this.authService.get<Event[]>(this.eventUrl).toPromise();
  }

  public addEvent(form) {
    return this.authService.post(this.eventUrl, form).toPromise();
  }

<<<<<<< HEAD
    public editEvent(eventId, form) {
        return this.authService.put(this.eventUrl + '/edit-event/' + eventId, form).toPromise();
    }

    public deleteEvent(eventId: bigint): Observable<Event[]> {
        return this.authService.delete(this.eventUrl + '/remove-event/' + eventId);
    }
=======

  // public getEvent(): Promise<Event> {
  //   return this.authService.get(this.eventUrl).toPromise();
  // }
>>>>>>> parent of 928adc3a... added group-ish
}
