import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import { Event} from '../model/event';
import {Observable} from 'rxjs';
import { Globals} from '../model/globals';


@Injectable({
    providedIn: 'root'
})
export class EventService {

    currentEvent: Event | null;

    constructor(
        private authService: AuthenticationService,
        private globals: Globals,
    ) {
    }

    private eventUrl = this.globals.ip + ':8080/events';
    public getEvents(): Observable<Event[]> {
        return this.authService.get<Event[]>(this.eventUrl);
    }

    public addEvent(form) {
        console.log(form);
        return this.authService.post(this.eventUrl, form).toPromise();
    }

    public editEvent(eventId, form) {
        return this.authService.put(this.eventUrl + '/edit-event/' + eventId, form).toPromise();
    }

    public deleteEvent(eventId: bigint): Observable<Event[]> {
        return this.authService.delete(this.eventUrl + '/remove-event/' + eventId);
    }
}
