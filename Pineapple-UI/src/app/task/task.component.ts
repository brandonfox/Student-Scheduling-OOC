import { Component, OnInit } from '@angular/core';
import {Task} from '../model/task';
import {Router} from '@angular/router';
import {TaskService} from '../service/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasks: Task[];
  constructor(
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskService.getTasks().then(
      data => { this.tasks = data; }
    );
  }

}
