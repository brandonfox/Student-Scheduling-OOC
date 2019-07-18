import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  sidenavWidth: 4;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.clearAuthToken();
  }
}
