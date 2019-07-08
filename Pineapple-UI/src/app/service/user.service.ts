import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

    private userUrl = 'http://localhost:8080/';

    public getUser(): Promise<User> {
        return this.authService.get<User>(this.userUrl + 'user').toPromise();
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
