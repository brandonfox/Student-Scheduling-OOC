import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {EventService} from '../../service/event.service';
import {Router} from '@angular/router';
import {MatDatepicker} from '@angular/material';
import { Moment } from 'moment';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

    name = 'Angular 4';
    @ViewChild(MatDatepicker, {static: false}) picker: MatDatepicker<Moment>;
    isValidMoment = false;

    serializedDate = new FormControl((new Date()).toISOString());

    date = new FormControl(new Date());
    form: FormGroup;

    events: Date[] = [];
    eventForm: FormGroup;
    loading = false;
    submitted = false;
    checked = true;
    disableSelect = new FormControl(this.checked);

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private eventService: EventService,
        private router: Router
    ) {}

    ngOnInit() {
        this.eventForm = this.formBuilder.group({
            name: ['', Validators.required],
            startDate: [''],
            endDate: [''],
            allDay: [Boolean],
            location: [''],
            description: ['']
        });
    }

    public onSubmit() {
        console.log('Submitting form');
        this.loading = true;
        this.submitted = true;
        if (this.eventForm.invalid) {
            this.loading = false;
            this.submitted = false;
            return;
        }
        console.log(this.eventForm.getRawValue());
        this.eventService.addEvent(this.eventForm.getRawValue());
        this.router.navigate(['main/home']);
    }
    get f() {return this.eventForm.controls; }
}
