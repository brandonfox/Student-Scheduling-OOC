import { Injectable } from '@angular/core';
import {Group} from '../model/group';
import {AuthenticationService} from './authentication.service';
import {Task} from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

    constructor(
        private authService: AuthenticationService
    ) { }

    private groupUrl = 'http://localhost:8080/groups';

    public getGroupsByUserId(userId: bigint): Promise<Group[]> {
        return this.authService.get<Group[]>(this.groupUrl + '/by-user-id' + '/' + userId).toPromise();
    }
}
