import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {EventService} from '../service/event.service';
import {Event} from '../model/event';
import {Task} from '../model/task';
import {TaskService} from '../service/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: Event[];
  tasks: Task[];
  constructor(
    private authService: AuthenticationService,
    private eventService: EventService,
    private taskService: TaskService
  ) {
    this.authService.authenticateUser();
  }

  ngOnInit() {
    this.eventService.getEvents().then(data => {
      this.events = data;
    });
    this.taskService.getTasks().then(data => {
      this.tasks = data;
    });
  }
  // TODO Change html file to display date in a more human readable format
  // TODO Add a refresh mechanism to display events properly
}
