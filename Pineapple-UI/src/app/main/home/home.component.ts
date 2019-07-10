import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { EventService } from '../../service/event.service';
import { UserService } from '../../service/user.service';
import { Event } from '../../model/event';
import { Task } from '../../model/task';
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
        this.eventService.getEvents().then(data => {
            this.events = data;
        });
        this.taskService.getTasks().then(data => {
            this.tasks = data;
        });
        console.log(this.user.valueOf());
        this.getUserInfo().then(data => this.user = data);
    }

    getUserInfo() {
        return this.userService.getUser();
    }
    // TODO Change html file to display date in a more human readable format
    // TODO Add a refresh mechanism to display events properly
    /* Pop up form for adding tasks */
    openTaskAddForm() {
        this.taskForm.reset(); // todo: does this even work
        document.getElementById('taskAddForm').style.display = 'block';
        (document.getElementById('taskAddButton') as HTMLButtonElement).disabled = true;
    }
    closeTaskAddForm() {
        document.getElementById('taskAddForm').style.display = 'none';
        (document.getElementById('taskAddButton') as HTMLButtonElement).disabled = false;
    }
    submitTaskAddForm() {
        console.log('Submitting task form');
        if (this.taskForm.invalid) {
            return;
        }
        this.taskService.createTask(this.taskForm.getRawValue());
        document.getElementById('taskAddForm').style.display = 'none';
        (document.getElementById('taskAddButton') as HTMLButtonElement).disabled = false;
    }
}
