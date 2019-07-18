import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {EventService} from '../../service/event.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-edit-event',
    templateUrl: './edit-event.component.html',
    styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
<<<<<<< HEAD
    eventForm: FormGroup;
    loading = false;
    submitted = false;
    checked = true;
    disableSelect = new FormControl(this.checked);
    currentEvent = this.eventService.currentEvent;
=======
  eventForm: FormGroup;
  loading = false;
  retrieved = false;
  checked = true;
  disableSelect = new FormControl(this.checked);
  // currentEvent = this.eventService.currentEvent;
>>>>>>> parent of 928adc3a... added group-ish

    event: any = {};
    sub: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private eventService: EventService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.eventForm = this.formBuilder.group({
            name: [this.currentEvent.name, Validators.required],
            startDate: this.currentEvent.startDate,
            startTime: this.currentEvent.startTime,
            endDate: this.currentEvent.endDate,
            endTime: this.currentEvent.endTime,
            location: this.currentEvent.location,
            description: this.currentEvent.description
        });
    }

    public onSubmit() {
        console.log('Updating form');
        console.log(this.disableSelect.value);
        this.eventForm.addControl(
            'allDay',
            new FormControl(this.disableSelect.value));
        this.loading = true;
        this.submitted = true;
        if (this.eventForm.invalid) {
            this.loading = false;
            this.submitted = false;
            return;
        }
        this.eventService.editEvent(this.currentEvent.id, this.eventForm.getRawValue());
        this.router.navigate(['main/home']);
    }

    get f() {return this.eventForm.controls; }
}

