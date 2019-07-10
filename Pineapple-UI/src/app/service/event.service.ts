import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import { Event} from '../model/event';
import {promise} from 'selenium-webdriver';
import Promise = promise.Promise;


@Injectable({
  providedIn: 'root'
})
export class EventService {

  currentEvent: Event | null;

  constructor(
    private authService: AuthenticationService,
  ) { }
  private eventUrl = 'http://localhost:8082/events';
  public getEvents(): Promise<Event[]> {
    return this.authService.get<Event[]>(this.eventUrl).toPromise();
  }
  public addEvent(form) {
    return this.authService.post(this.eventUrl, form).toPromise();
  }


  // public getEvent(): Promise<Event> {
  //   return this.authService.get(this.eventUrl).toPromise();
  // }
}
