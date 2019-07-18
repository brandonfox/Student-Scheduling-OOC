import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {EventService} from '../../service/event.service';
import {Router} from '@angular/router';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;
  loading = false;
  submitted = false;
  checked = true;
  disableSelect = new FormControl(this.checked);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private eventService: EventService,
    private router: Router,
  ) { }

<<<<<<< HEAD
    ngOnInit() {
        this.eventForm = this.formBuilder.group({
            name: ['', Validators.required],
            startDate: ['', Validators.required],
            startTime: [''],
            endDate: ['', Validators.required],
            endTime: [''],
            location: [''],
            description: ['']
        });
    }
=======
  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      startTime: [DateTimeFormat()],
      endTime: [DateTimeFormat()],
      allDay: [Boolean],
      description: [''],
    });
  }
>>>>>>> parent of 928adc3a... added group-ish

  public onSubmit() {
    console.log('Submitting form');
    this.loading = true;
    this.submitted = true;
    if (this.eventForm.invalid) {
      this.loading = false;
      return;
    }
    this.eventService.addEvent(this.eventForm.getRawValue());
    this.router.navigate(['main/home']);
  }
  get f() {return this.eventForm.controls; }
}
