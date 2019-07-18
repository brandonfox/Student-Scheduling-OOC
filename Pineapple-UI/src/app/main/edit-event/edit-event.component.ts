import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {EventService} from '../../service/event.service';
import {Router} from '@angular/router';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
  eventForm: FormGroup;
  loading = false;
  retrieved = false;
  checked = true;
  disableSelect = new FormControl(this.checked);
  currentEvent = this.eventService.currentEvent;

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
    console.log('Retrieving form');
    this.loading = true;
    this.retrieved = true;
    if (this.eventForm.invalid) {
      this.loading = false;
      return;
    }
    this.eventService.addEvent(this.eventForm.getRawValue());
    this.router.navigate(['main/home']);
  }
  get f() {return this.eventForm.controls; }
}
