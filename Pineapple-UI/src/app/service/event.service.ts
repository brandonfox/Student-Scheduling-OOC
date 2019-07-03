import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private authService: AuthenticationService,
  ) { }
  private eventUrl = 'http://localhost:8080/events';
  public getEvents() {
    return this.authService.get(this.eventUrl);
  }
  public addEvent(form) {
    return this.authService.post(this.eventUrl, form).toPromise();
  }
}
