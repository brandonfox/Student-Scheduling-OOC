import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {EventService} from '../service/event.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.scss']
})
export class AddeventComponent implements OnInit {
  eventForm: FormGroup;
  loading = false;
  checked = false;
  disabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private eventService: EventService,
    private router: Router,
  ) { }

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
