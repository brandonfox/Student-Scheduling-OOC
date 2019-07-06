import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Task} from '../model/task';
import {Router} from '@angular/router';
import {TaskService} from '../service/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  createCardForm: FormGroup;
  tasks: Task[];
  constructor(
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(
      data => { this.tasks = data; }
    );
  }
  get getField() { return this.createCardForm.controls; }
  createTask() {
    console.log('Creating task');
    if (this.createCardForm.invalid) { return; }
    console.log('Creating task with: ' + this.createCardForm.getRawValue());
    this.taskService.createTask(this.createCardForm.getRawValue())
      .subscribe(params => { });
  }

  editCard(task: Task): void {
    this.taskService.editTask(task)
      .subscribe(params => {
        this.tasks = this.tasks.filter(c => c !== task);
      });
  }

}
