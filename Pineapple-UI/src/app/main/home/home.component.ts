import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { EventService } from '../../service/event.service';
import { UserService } from '../../service/user.service';
import { Event } from '../../model/event';
import { TaskService } from '../../service/task.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
    taskAddForm: FormGroup;
    taskEditForm: FormGroup;

    titleBeingEdited = new FormControl('');
    descriptionBeingEdited = new FormControl('');

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
        this.taskAddForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: '',
            event: null
        });
        this.eventService.getEvents().subscribe(data => {
            this.events = data;
            for (const event of this.events) {
                this.getTasksByEventId(event);
            }
        });
        this.getUserInfo().then(data => this.user = data);
    }

    getTasksByEventId(event) {
        this.taskService.getTasksByEventId(event.id).subscribe(data => {
            event.tasks = data;
        });
    }

    getUserInfo() {
        return this.userService.getUser();
    }
    // TODO Change html file to display date in a more human readable format
    // TODO Add a refresh mechanism to display events properly

    /* Pop up form for adding tasks */
    openTaskAddForm(eventId) {
        this.taskAddForm.reset();
        this.togglePopup('addForm-eventId-' + eventId, 'block', true);
    }

    closeTaskAddForm(eventId) {
        this.togglePopup('addForm-eventId-' + eventId, 'none', false);
    }

    submitTaskAddForm(thisEvent) {
        console.log('Submitting task form');
        if (this.taskAddForm.invalid) {
            return;
        }
        this.taskAddForm.patchValue({
            event: thisEvent
        });
        this.taskService.createTask(this.taskAddForm.getRawValue()).then(
            data => this.getTasksByEventId(thisEvent)
        );
        this.togglePopup('addForm-eventId-' + thisEvent.id, 'none', false);
    }

    toggleAllButtonsDisabled(status: boolean) {
        document.querySelectorAll('*[id^="eventId"').forEach(
            button => {
                (button as HTMLButtonElement).disabled = status;
            }
        );
        document.querySelectorAll('*[id^="taskId"').forEach(
            button => {
                (button as HTMLButtonElement).disabled = status;
            }
        );
    }

    togglePopup(elementId, displayType: string, disable: boolean) {
        document.getElementById(elementId).style.display = displayType;
        this.toggleAllButtonsDisabled(disable);
    }

    openTaskSettings(task) {
        this.titleBeingEdited.setValue(task.title);
        this.descriptionBeingEdited.setValue(task.description);
        this.togglePopup('editForm-taskId-' + task.id, 'block', true);
    }

    closeTaskSettings(taskId) {
        this.togglePopup('editForm-taskId-' + taskId, 'none', false);
        this.titleBeingEdited.setValue('');
        this.descriptionBeingEdited.setValue('');
    }

    buildTaskEditForm() {
        return this.formBuilder.group({
            title: this.titleBeingEdited.value,
            description: this.descriptionBeingEdited.value
        });
    }

    submitTaskEditForm(task, event) {
        if (this.titleBeingEdited.value !== task.title || this.descriptionBeingEdited.value !== task.description) {
            console.log('Submitting task edit form');
            this.taskService.editTask(task.id, this.buildTaskEditForm().getRawValue()).then(
                data => this.getTasksByEventId(event)
            );
        }
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
}
