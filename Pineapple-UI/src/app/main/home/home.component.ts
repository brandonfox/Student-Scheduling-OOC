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
            description: [''],
            event: null
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
        this.taskForm.reset();
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
        this.taskForm.patchValue({
            event: thisEvent
        });
        this.taskService.createTask(this.taskForm.getRawValue()).then(
            data => this.getTasksByEventId(thisEvent)
        );
        document.getElementById('addForm-eventId-' + thisEvent.id).style.display = 'none';
        this.toggleAllButtonsDisabled(false);
    }

    toggleAllButtonsDisabled(status: boolean) {
        for (const event of this.events) {
            (document.getElementById('eventId-' + event.id.toString()) as HTMLButtonElement).disabled = status;
        }
    }

    public setCurrentEvent(event) {
        this.eventService.currentEvent = event;
    }
}
