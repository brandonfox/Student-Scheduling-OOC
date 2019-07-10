import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../model/user';
import {AuthenticationService} from './authentication.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient,
        private authService: AuthenticationService) {
    }

  private userUrl = 'http://localhost:8082/';

    public getUser(): Promise<User> {
        return this.authService.get<User>(this.userUrl + '/user').toPromise();
    }

    public getUsers(params?: HttpParams): Promise<User[]> {
        return this.authService.get<User[]>('http://localhost:8080/users', params).toPromise();
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
    // ----------------------Friends stuff section-------------------------
    public getFriends(params?: HttpParams) {
        return this.authService.get<User[]>(this.userUrl + '/friends', params);
    }
}
