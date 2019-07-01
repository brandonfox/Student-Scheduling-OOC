import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../service/user.service';
import {RegistrationResponse} from '../model/registration-response';
import { AuthenticationService} from '../service/authentication.service';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    userResponse: RegistrationResponse;


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
          this.router.navigate(['/register']);
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        console.log('Submitting form');
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        console.log('Form: ' + this.registerForm.getRawValue());
        this.userService.createUser(this.registerForm.getRawValue()).subscribe(
          data => this.processRegisterResponse(data)
        );
    }
    processRegisterResponse(data) {
      // TODO Store session information in an authentication token stored as a cookie
      this.userResponse = data.valueOf();
      console.log(this.userResponse.successStatus);
      if (this.userResponse.successStatus) {
        this.authenticationService.setAuthToken(this.userResponse.context);
        this.router.navigate(['main']);
      }
      // TODO change form to display error information (Username taken, email taken etc.)
    }
}
