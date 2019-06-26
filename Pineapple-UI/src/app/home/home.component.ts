import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import {User} from '../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[];

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      data => {this.users = data; }
      );
  }

  editUser(user: User): void {
    this.userService.editUser(user)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      });
  };
}
