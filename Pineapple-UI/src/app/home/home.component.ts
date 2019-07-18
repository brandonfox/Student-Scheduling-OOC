import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {EventService} from '../service/event.service';
import {Event} from '../model/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: Event[];
  constructor(
    private authService: AuthenticationService,
    private eventService: EventService,
  ) {
    this.authService.authenticateUser();
  }

  ngOnInit() {

    this.eventService.getEvents().then(data => {
      this.events = data;
    });
  }

  public setCurrentEvent(event){
    this.eventService.currentEvent = event;
  }
  // TODO Change html file to display date in a more human readable format
  // TODO Add a refresh mechanism to display events properly
}
