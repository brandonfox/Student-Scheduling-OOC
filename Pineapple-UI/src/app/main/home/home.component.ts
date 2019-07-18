<<<<<<< HEAD
import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {EventService} from '../../service/event.service';
import {UserService} from '../../service/user.service';
import {Event} from '../../model/event';
import {TaskService} from '../../service/task.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
=======
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { EventService } from '../../service/event.service';
import { UserService } from '../../service/user.service';
import { Event } from '../../model/event';
import { Task } from '../../model/task';
import { TaskService } from '../../service/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
>>>>>>> parent of 928adc3a... added group-ish

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    now: number;

    private users;
    private user;
    events: Event[];
    tasks: Task[];
    taskForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private userService: UserService,
        private eventService: EventService,
        private taskService: TaskService
    ) {
        this.authService.authenticateUser();
        this.users = userService.getUsers();
        this.user = userService.getUser();
    }

    ngOnInit() {
        this.taskForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['']
        });
<<<<<<< HEAD
        this.getAll();
=======
        this.eventService.getEvents().then(data => {
            this.events = data;
        });
        this.getTasks();
        console.log(this.user.valueOf());
>>>>>>> parent of 928adc3a... added group-ish
        this.getUserInfo().then(data => this.user = data);
    }

    getTasks() {
        this.taskService.getTasks().then(data => {
            this.tasks = data;
        });
    }

    getUserInfo() {
        return this.userService.getUser();
    }
    // TODO Change html file to display date in a more human readable format
    // TODO Add a refresh mechanism to display events properly
    /* Pop up form for adding tasks */
    openTaskAddForm(thisEvent) {
        this.taskForm.reset(); // todo: does this even work
        document.getElementById('addForm-eventId-' + thisEvent.id).style.display = 'block';
        this.toggleAllButtonsDisabled(true);
    }
    closeTaskAddForm(thisEvent) {
        document.getElementById('addForm-eventId-' + thisEvent.id).style.display = 'none';
        this.toggleAllButtonsDisabled(false);
    }
    submitTaskAddForm(thisEvent) {
        console.log('Submitting task form');
        if (this.taskForm.invalid) {
            return;
        }
        this.taskService.createTask(this.taskForm.getRawValue());
        this.getTasks();
        document.getElementById('addForm-eventId-' + thisEvent.id).style.display = 'none';
        this.toggleAllButtonsDisabled(false);
    }
    toggleAllButtonsDisabled(status: boolean) {
        for (const event of this.events) {
            (document.getElementById('eventId-' + event.id.toString()) as HTMLButtonElement).disabled = status;
        }
<<<<<<< HEAD
        this.togglePopup('editForm-taskId-' + task.id, 'none', false);
        this.titleBeingEdited.setValue('');
        this.descriptionBeingEdited.setValue('');
    }

    removeTask(taskId, event) {
        console.log('Removing task!');
        this.taskService.removeTask(taskId).subscribe(
            data => this.getTasksByEventId(event)
        );
        this.togglePopup('editForm-taskId-' + taskId, 'none', false);
    }

    public setCurrentEvent(event) {
        this.eventService.currentEvent = event;
    }

    deleteEvent(eventId) {
        console.log('Deleting event...');
        this.eventService.deleteEvent(eventId).subscribe(
            data => this.getAll()
        )
    }

    getAll() {
        this.eventService.getEvents().subscribe(data => {
            this.events = data;
            for (const event of this.events) {
                this.getTasksByEventId(event);
            }
        });
=======
>>>>>>> parent of 928adc3a... added group-ish
    }
}
