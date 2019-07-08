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

    events: Event[];
    user: User;
    constructor(
        private authService: AuthenticationService,
        private eventService: EventService
    ) {
    }

    ngOnInit() {
        this.eventService.getEvents().then(data => {
            this.events = data;
        });
    }
    // TODO Change html file to display date in a more human readable format
    // TODO Add a refresh mechanism to display events properly
}
