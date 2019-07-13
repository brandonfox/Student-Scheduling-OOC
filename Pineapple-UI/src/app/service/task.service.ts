import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Task} from '../model/task';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
      private authService: AuthenticationService,
  ) { }

  private taskUrl = 'http://localhost:8080/tasks';

  public getTasksByEventId(eventId: bigint): Observable<Task[]> {
      return this.authService.get<Task[]>(this.taskUrl + '/by-event' + '/' + eventId);
  }

  public createTask(task) {
    return this.authService.post(this.taskUrl, task).toPromise();
  }

  public editTask(task) {
      return this.authService.post(this.taskUrl, task).toPromise();
  }

  public removeTask(taskId: bigint) {
      return this.authService.delete(this.taskUrl + '/remove-task' + '/' + taskId);
  }
}
