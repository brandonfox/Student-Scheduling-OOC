import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {MatTabChangeEvent} from '@angular/material';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FriendListComponent implements OnInit {
    friends: User[];
    searchBar;
    currentTab;

  constructor(
      private userService: UserService,
  ) { }

  ngOnInit() {
      this.getFriends(); // Make sure the starting active tab is the friends tab
  }
  getFriends() {
     this.userService.getFriends(this.getSearchParams()).subscribe(data => this.friends = data);
  }
  tabChange(tab: MatTabChangeEvent) {
      this.friends = null;
      this.currentTab = tab.tab.ariaLabel;
      this.getData();
  }
  getData() {
      if (this.currentTab === 'friends') {
          console.log('Getting friends');
          this.getFriends();
      }
      if (this.currentTab === 'users') {
          console.log('Getting all users');
          this.userService.getUsers(this.getSearchParams()).then(data => this.friends = data);
      }
  }
  getSearchParams(): HttpParams {
      return new HttpParams().append('search', this.searchBar);
  }
  searchChange() {
      this.getData();
  }
}
