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
  }

  ngOnInit() {
    this.authService.authenticateUser();
    this.eventService.getEvents().then(data => {
      this.events = data;
    });
  }
}
