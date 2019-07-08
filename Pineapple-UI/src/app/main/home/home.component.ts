import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {EventService} from '../../service/event.service';
import {Event} from '../../model/event';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    now: number;

    private users;
    private user;

    constructor(
        private authService: AuthenticationService,
        private userService: UserService,
        private eventService: EventService
    ) {
        this.users = userService.getUsers();
        this.user = userService.getUser();
    }

    ngOnInit() {
        console.log(this.user.valueOf());
        this.getUserInfo().then(data => this.user = data);
    }

    getUserInfo() {
        return this.userService.getUser();
    }
    // TODO Change html file to display date in a more human readable format
    // TODO Add a refresh mechanism to display events properly
}
