import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import { Event} from '../model/event';
import {Observable} from 'rxjs';


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
    public getEvents(): Observable<Event[]> {
        return this.authService.get<Event[]>(this.eventUrl);
    }

    public addEvent(form) {
        console.log(form);
        return this.authService.post(this.eventUrl, form).toPromise();
    }

    public deleteEvent(eventId: bigint): Observable<Event[]> {
        return this.authService.delete(this.eventUrl + '/remove-event/' + eventId);
    }


    // public getEvent(): Promise<Event> {
    //   return this.authService.get(this.eventUrl).toPromise();
    // }
}
