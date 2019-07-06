import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Task} from '../model/task';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/';

  public getTasks() {
    return this.http.get<Task[]>(this.url + '/tasks');
  }

  public editTask(task) {
    return this.http.post(this.url + '/edit-card', task);
  }

  public createTask(task) {
    return this.http.post<Task>(this.url + '/create-card', task);
  }
}
