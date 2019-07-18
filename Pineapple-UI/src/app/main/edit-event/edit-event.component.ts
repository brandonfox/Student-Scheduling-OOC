import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
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
    eventForm: FormGroup;
    loading = false;
    submitted = false;
    checked = true;
    disableSelect = new FormControl(this.checked);
    currentEvent = this.eventService.currentEvent;

    event: any = {};
    sub: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private eventService: EventService,
        private router: Router,
    ) { }

    ngOnInit() {
        // this.sub = this.route.params.subscribe(params => {
        //     const id = params['id'];
        //     if (id) {
        //         this.eventService.get(id).subscribe((event: any) => {
        //             if (event) {
        //                 this.event = event;
        //                 this.event.href = event._links.self.href;
        //                 this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
        //             } else {
        //                 console.log(`Car with id '${id}' not found, returning to list`);
        //                 this.gotoList();
        //             }
        //         });
        //     }
        // });
        this.eventForm = this.formBuilder.group({
            name: this.currentEvent.name,
            startDate: this.currentEvent.startDate,
            startTime: this.currentEvent.startTime,
            endDate: this.currentEvent.endDate,
            endTime: this.currentEvent.endTime,
            location: this.currentEvent.location,
            description: this.currentEvent.description
        });
    }

    public onSubmit() {
        console.log('Submitting form');
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
        this.eventService.addEvent(this.eventForm.getRawValue());
        this.router.navigate(['main/home']);
    }

    get f() {return this.eventForm.controls; }
}
