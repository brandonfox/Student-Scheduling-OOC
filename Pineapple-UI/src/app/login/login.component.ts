import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService} from '../service/user.service';
import { ServerResponse } from '../model/server-response';
import { AuthenticationService} from '../service/authentication.service';

@Component({
    selector: 'app-login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    invalidCredentials: boolean;

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
        console.log('Initializing...');
        console.log(this.authService.getAuthToken());
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
        // this.authService.checkAuthToken().then(data => {
        // if (data) {
        //   this.router.navigate(['main']);
        // }});
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        this.loading = true;
        console.log('Submitting form');

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            this.loading = false;
            return;
        }
        console.log('Valid form');
        this.userService.attemptLogin(this.loginForm.getRawValue()).subscribe(data => this.processLoginResponse(data));
    }
    processLoginResponse(data) {
        const loginResponse: ServerResponse = data.valueOf();
        if (loginResponse.successStatus) {
            console.log('Login Successful');
            this.authService.setAuthToken(loginResponse.context);
            this.router.navigate(['main/home']);
        } else {
            this.invalidCredentials = true; // Use this boolean for determining whether an error message should be displayed
        }
        this.loading = false;
    }
}
