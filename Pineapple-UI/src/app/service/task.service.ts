import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Task} from '../model/task';
import {Observable} from 'rxjs';
import { Globals } from '../model/globals';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
      private authService: AuthenticationService,
      private globals: Globals,
  ) { }

  private taskUrl = this.globals.ip + ':8080/tasks';

  public getTasksByEventId(eventId: bigint): Promise<Task[]> {
      return this.authService.get<Task[]>(this.taskUrl + '/by-event' + '/' + eventId).toPromise();
  }

  public createTask(task) {
    return this.authService.post(this.taskUrl, task).toPromise();
  }

  public editTask(taskId, form) {
      return this.authService.put(this.taskUrl + '/edit-task' + '/' + taskId, form).toPromise();
  }

  public removeTask(taskId: bigint) {
      return this.authService.delete(this.taskUrl + '/remove-task' + '/' + taskId);
  }
}
