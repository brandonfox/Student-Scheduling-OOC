import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Task} from '../model/task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private authService: AuthenticationService) { }

  private taskUrl = 'http://localhost:8080/tasks';

  public getTasks(): Promise<Task[]> {
    return this.authService.get<Task[]>(this.taskUrl).toPromise();
  }

  public createTask(task) {
    return this.authService.post(this.taskUrl, task).toPromise();
  }

  public editTask(task) {
      return this.authService.post(this.taskUrl, task).toPromise();
  }
}
