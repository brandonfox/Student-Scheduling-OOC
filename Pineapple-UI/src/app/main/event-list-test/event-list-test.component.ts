import { Component, OnInit } from '@angular/core';
import {EventService } from '../../service/event.service';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list-test.component.html',
  styleUrls: ['./event-list-test.component.css']
})
export class EventListTestComponent implements OnInit {
    private events;

    constructor(
    private eventService: EventService,
    private authService: AuthenticationService
  ) {
    this.authService.authenticateUser();
    this.events = eventService.getEvents();
  }

  ngOnInit() {
  }

}
