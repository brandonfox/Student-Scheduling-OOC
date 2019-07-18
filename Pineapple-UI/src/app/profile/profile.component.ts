import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {User} from '../model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    private user: User;

    constructor() { }

    ngOnInit() {
    }

}
