import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { EventService } from '../../service/event.service';
import { UserService } from '../../service/user.service';
import { Event } from '../../model/event';
import { TaskService } from '../../service/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
            description: [''],
            event: null
        });
        this.taskEditForm = this.formBuilder.group({
            title: [''],
            description: ['']
        });
        this.eventService.getEvents().subscribe(data => {
            this.events = data;
            for (const event of this.events) {
                this.getTasksByEventId(event);
            }
        });
        console.log(this.user.valueOf());
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
    openTaskAddForm(thisEvent) {
        this.taskAddForm.reset();
        this.togglePopup('addForm-eventId-' + thisEvent.id, 'block', true);
    }

    closeTaskAddForm(thisEvent) {
        this.togglePopup('addForm-eventId-' + thisEvent.id, 'none', false);
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
        document.getElementById('addForm-eventId-' + thisEvent.id).style.display = 'none';
        this.toggleAllButtonsDisabled(false);
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
        this.taskEditForm.reset();
        this.togglePopup('editForm-taskId-' + task.id, 'block', true);
    }

    closeTaskSettings(task) {
        this.togglePopup('editForm-taskId-' + task.id, 'none', false);
    }

    submitTaskEditForm() {
        console.log('Submitting task edit form');
        if (this.taskAddForm.invalid) {
            return;
        }
    }

    removeTask() {
        console.log('Removing task!');
    }

    public setCurrentEvent(event) {
        this.eventService.currentEvent = event;
    }
}
