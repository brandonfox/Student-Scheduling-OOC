import { Component, OnInit } from '@angular/core';
import {Group} from '../model/group';
import {AuthenticationService} from '../service/authentication.service';
import {UserService} from '../service/user.service';
import {GroupService} from '../service/group.service';
import {User} from '../model/user';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

    private readonly user;
    groups: Group[];

    constructor(
        private authService: AuthenticationService,
        private userService: UserService,
        private groupService: GroupService
    ) {
        this.authService.authenticateUser();
        this.user = userService.getUser();
    }

    ngOnInit() {
        this.getGroupsByUserId(this.user);
    }

    getGroupsByUserId(user) {
        this.groupService.getGroupsByUserId(user.id).then(
            data => {
                this.groups = data;
            });
    }

}
