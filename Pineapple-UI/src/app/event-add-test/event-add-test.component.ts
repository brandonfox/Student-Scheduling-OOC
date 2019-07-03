import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { EventService } from '../service/event.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add-test.component.html',
  styleUrls: ['./event-add-test.component.css']
})
export class EventAddTestComponent implements OnInit {
  eventForm: FormGroup;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private eventService: EventService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
  }
  public onSubmit() {
    this.loading = true;
    if (this.eventForm.invalid) {
      this.loading = false;
      return;
    }
    this.eventService.addEvent(this.eventForm.getRawValue());
    this.router.navigate(['events']);
  }
  get f() {return this.eventForm.controls; }
}
