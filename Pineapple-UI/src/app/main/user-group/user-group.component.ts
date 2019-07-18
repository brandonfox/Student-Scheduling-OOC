import { Component, OnInit } from '@angular/core';
import {UserGroup} from '../../model/userGroup';
import {AuthenticationService} from '../../service/authentication.service';
import {UserService} from '../../service/user.service';
import {UserGroupService} from '../../service/user-group.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {

    private user: User;
    userGroups: UserGroup[];

    constructor(
        private authService: AuthenticationService,
        private userService: UserService,
        private groupService: UserGroupService
    ) {
        this.authService.authenticateUser();
        authService.getLoggedUser().then(
            data => this.user = data
        );
    }

    ngOnInit() {
        this.getUserGroupsById(this.user);
    }

    getUserGroupsById(user) {
        this.groupService.getUserGroupsByUserId(user.id).then(
            data => {
                this.userGroups = data;
            });
    }

}
