import { Component, OnInit } from '@angular/core';
import {UserGroup} from '../../model/userGroup';
import {AuthenticationService} from '../../service/authentication.service';
import {UserService} from '../../service/user.service';
import {UserGroupService} from '../../service/user-group.service';
import {User} from '../../model/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {

    user: User;
    userGroups: UserGroup[];
    groupAddForm: FormGroup;

    userBeingAdded = new FormControl('');

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private userService: UserService,
        private groupService: UserGroupService
    ) {
        this.authService.authenticateUser();
    }

    ngOnInit() {
        this.groupAddForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ''
        });
        this.authService.getLoggedUser().then(
            data => {
                this.user = data;
                this.getUserGroupsById(this.user);
            });
    }

    getUserGroupsById(user) {
        this.groupService.getUserGroupsByUserId(user.id).then(
            data => {
                this.userGroups = data;
            });
    }

    /* Pop up form for adding tasks */
    openGroupAddForm() {
        this.groupAddForm.reset();
        this.togglePopup('add-group-form', 'block', true);
    }

    closeGroupAddForm() {
        this.togglePopup('add-group-form', 'none', false);
    }

    submitGroupAddForm() {
        console.log('Submitting group form');
        if (this.groupAddForm.invalid) {
            return;
        }
        this.groupService.createGroup(this.groupAddForm.getRawValue()).then(
            data => this.getUserGroupsById(this.user)
        );
        this.togglePopup('add-group-form', 'none', false);
    }

    togglePopup(elementId, displayType: string, disable: boolean) {
        document.getElementById(elementId).style.display = displayType;
        // this.toggleAllButtonsDisabled(disable);
    }

    openAddUserForm(userGroup) {
        this.userBeingAdded.setValue('');
        this.togglePopup('add-user-form-group-' + userGroup.id, 'block', true);
    }

    closeAddUserForm(userGroup) {
        this.togglePopup('add-user-form-group-' + userGroup.id, 'none', false);
        this.userBeingAdded.setValue('');
    }

    submitAddUserForm(userGroup) {
        console.log('Adding user to group');
            this.groupService.addUserToGroup(userGroup.id, this.userBeingAdded.value).then(
                data => this.getUserGroupsById(this.user)
            );
        this.togglePopup('add-user-form-group-' + userGroup.id, 'none', false);
        this.userBeingAdded.setValue('');
    }
}
