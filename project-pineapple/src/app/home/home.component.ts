import { Component, OnInit } from '@angular/core';
import { UserService } from "../service/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Array<any>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.findAll().subscribe(
      data => {this.users = data}
    );
  }

}
