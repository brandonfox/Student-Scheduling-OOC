import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Task} from '../model/task';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
      private authService: AuthenticationService,
  ) { }

  private taskUrl = environment.backendUrl + '/tasks';

  public getTasksByEventId(eventId: bigint): Observable<Task[]> {
      return this.authService.get<Task[]>(this.taskUrl + '/by-event' + '/' + eventId);
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
