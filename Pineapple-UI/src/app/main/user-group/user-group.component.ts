import { Component, OnInit } from '@angular/core';
import {UserGroup} from '../../model/userGroup';
import {AuthenticationService} from '../../service/authentication.service';
import {UserService} from '../../service/user.service';
import {UserGroupService} from '../../service/user-group.service';
import {User} from '../../model/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {

    user: User;
    userGroups: UserGroup[];
    groupAddForm: FormGroup;

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
            title: ['', Validators.required],
            description: '',
            event: null
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
    openTaskAddForm(eventId) {
        this.groupAddForm.reset();
        this.togglePopup('add-group-form', 'block', true);
    }

    closeGroupAddForm(eventId) {
        this.togglePopup('add-group-form', 'none', false);
    }

    submitGroupAddForm() {
        console.log('Submitting task form');
        if (this.groupAddForm.invalid) {
            return;
        }
        // this.groupAddForm.patchValue({
        //     event: thisEvent
        // });
        // this.group.createTask(this.taskAddForm.getRawValue()).then(
        //     data => this.getTasksByEventId(thisEvent)
        // );
        this.togglePopup('add-group-form', 'none', false);
    }

    togglePopup(elementId, displayType: string, disable: boolean) {
        document.getElementById(elementId).style.display = displayType;
        // this.toggleAllButtonsDisabled(disable);
    }
}
