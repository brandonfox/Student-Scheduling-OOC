import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  private userUrl = 'http://localhost:8082/';

  public getUsers() {
    return this.http.get<User[]>(this.userUrl + '/users' + '/all');
  }

  public editUser(user) {
    return this.http.post(this.userUrl + '/update', user);
  }

  public createUser(user) {
    return this.http.post<User>(this.userUrl + '/register', user);
  }
  public attemptLogin(login) {
    return this.http.post(this.userUrl + '/login', login);
  }
}
