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

  public getTasksByEventId(eventId: bigint): Promise<Task[]> {
      return this.authService.get<Task[]>(this.taskUrl + '/by-event' + '/' + eventId).toPromise();
  }

  public createTask(title, descr, eventId) {
    return this.authService.post(this.taskUrl + '/' + title + '/' + descr + '/' + eventId, null).toPromise();
  }

  public editTask(taskId, form) {
      return this.authService.put(this.taskUrl + '/edit-task' + '/' + taskId, form).toPromise();
  }

  public removeTask(taskId, eventId) {
      console.log('task id: ' + taskId);
      return this.authService.delete(this.taskUrl + '/remove-task' + '/' + taskId + '/' + eventId);
  }
}
