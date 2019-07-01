import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService} from '../service/user.service';
import {UserQueryResponse} from '../model/user-query-response';
import { AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-login-component',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private authService: AuthenticationService
    ) {
            this.router.navigate(['/login']);
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        console.log('Submitting form');
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.userService.attemptLogin(this.loginForm.getRawValue()).subscribe(data => this.processLoginResponse(data));
    }
    processLoginResponse(data) {
      const loginResponse: UserQueryResponse = data.valueOf();
      if (loginResponse.successStatus) {
        // Login successfull
        this.authService.setAuthToken(loginResponse.context);
        this.router.navigate(['main']);
      }
      // TODO Else with a visual update for the user to know that their info was invalid
    }
}
