import { Injectable } from '@angular/core';
import {UserGroup} from '../model/userGroup';
import {AuthenticationService} from './authentication.service';
import {Task} from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

    constructor(
        private authService: AuthenticationService
    ) { }

    private groupUrl = 'http://localhost:8080/user-groups';

    public getUserGroupsByUserId(userId: bigint): Promise<UserGroup[]> {
        return this.authService.get<UserGroup[]>(this.groupUrl + '/by-user-id/' + userId).toPromise();
    }

    public createGroup(group) {
        return this.authService.post(this.groupUrl, group).toPromise();
    }
}
