import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {Group} from '../model/group';

@Injectable({
    providedIn: 'root'
})
export class GroupService {

    constructor(
        private authService: AuthenticationService
    ) {}

    private groupUrl = 'http://localhost:8080/groups';

    public getGroups(): Observable<Group[]> {
        return this.authService.get<Group[]>(this.groupUrl);
    }
}
