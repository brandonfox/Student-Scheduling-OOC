import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {EventService} from '../service/event.service';
import {Router} from '@angular/router';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.scss']
})
export class AddeventComponent implements OnInit {
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

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      startTime: [DateTimeFormat()],
      endTime: [DateTimeFormat()],
      allDay: [Boolean],
      description: [''],
    });
  }

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
