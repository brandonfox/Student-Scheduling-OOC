import { Injectable } from '@angular/core';
import {UserGroup} from '../model/userGroup';
import {AuthenticationService} from './authentication.service';
import {Task} from '../model/task';
import {User} from '../model/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

    constructor(
        private authService: AuthenticationService
    ) { }

    private groupUrl = 'http://localhost:8080/user-groups';

    public getUserGroupsByUserId(userId: bigint): Observable<UserGroup[]> {
        return this.authService.get<UserGroup[]>(this.groupUrl + '/by-user-id/' + userId);
    }

    public createGroup(group) {
        return this.authService.post(this.groupUrl, group).toPromise();
    }

    public addUserToGroup(groupId: bigint, username: string) {
        return this.authService.post(this.groupUrl + '/add-user/' + groupId + '/' + username, null).toPromise();
    }

    public getUsersByGroupId(userGroup): Promise<User[]> {
        return this.authService.get<User[]>(this.groupUrl + '/by-group-id/' + userGroup.id).toPromise();
    }

}
