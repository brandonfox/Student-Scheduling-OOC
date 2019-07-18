import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {MatTabChangeEvent} from '@angular/material';
import {HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';

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
    sentFriendRequests: User[];
    receivedFriendRequests: User[];
    sentFRIds: Set<bigint>;
    receivedFRIds: Set<bigint>;
    friendIds: Set<bigint>;

    searchBar;
    currentTab;
    loggedUser: User;

  constructor(
      private userService: UserService,
      private router: Router,
      private authService: AuthenticationService,
  ) { }

  ngOnInit() {
      this.getLoggedUser();
      this.getFriends(); // Make sure the starting active tab is the friends tab
  }
  removeFriend(friend) {
      this.userService.removeFriend(friend).then(() => this.getFriends());
  }
  setFriends(friends) {
      this.friends = friends;
      this.updateIds();
  }
  setSentRequests(data: User[]) {
      this.sentFriendRequests = data;
      const ids = new Set<bigint>();
      this.sentFriendRequests.forEach(user => ids.add(user.id));
      this.sentFRIds = ids;
  }
  setReceivedRequests(data: User[]) {
      this.receivedFriendRequests = data;
      const ids = new Set<bigint>();
      this.receivedFriendRequests.forEach(user => ids.add(user.id));
      this.receivedFRIds = ids;
  }
  getFriends() {
     this.userService.getFriends(this.getSearchParams()).then(data => this.setFriends(data));
     this.userService.getSentFriendRequests().then(data => this.setSentRequests(data));
     this.userService.getReceivedFriendRequests().then(data => this.setReceivedRequests(data));
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
      this.userService.addFriend(user).then(() => this.getFriends());
  }
  denyRequest(user) {
      this.userService.denyRequest(user).then(() => this.getFriends());
  }
  updateIds() {
      const ids = new Set<bigint>();
      this.friends.forEach(user => ids.add(user.id));
      this.friendIds = ids;
  }
  userClicked(user: User) {
      this.router.navigate(['user/' + user.username]);
  }
  getLoggedUser() {
      this.authService.getLoggedUser().then(data => this.loggedUser = data);
  }
}
