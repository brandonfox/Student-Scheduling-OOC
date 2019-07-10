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
// TODO Stop user pressing add friend button after already pressing it
export class FriendListComponent implements OnInit {
    friends: User[];
    users: User[];
    friendIds: Set<bigint>;
    searchBar;
    currentTab;

  constructor(
      private userService: UserService,
  ) { }

  ngOnInit() {
      this.getFriends(); // Make sure the starting active tab is the friends tab
  }
  setFriends(friends) {
      this.friends = friends;
      this.updateIds();
  }
  getFriends() {
     this.userService.getFriends(this.getSearchParams()).then(data => this.setFriends(data));
  }
  getUsers() {
      this.userService.getUsers(this.getSearchParams()).then(data => this.users = data);
  }
  tabChange(tab: MatTabChangeEvent) {
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
          this.getUsers();
      }
  }
  getSearchParams(): HttpParams {
      return new HttpParams().append('search', this.searchBar);
  }
  searchChange() {
      this.getData();
  }
  addFriend(user) {
      this.userService.addFriend(user).then(data => this.getFriends());
  }
  updateIds() {
      const ids = new Set<bigint>();
      this.friends.forEach(user => ids.add(user.id));
      this.friendIds = ids;
  }
}
