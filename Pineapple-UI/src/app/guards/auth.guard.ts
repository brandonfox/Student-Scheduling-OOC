import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    login = false;

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        console.log('AuthGuard#canActivate called');
        return this.checkLogin();
        // if (this.authService.getAuthToken()) {
        //     return true;
        // }
        //
        // // navigate to login page
        // this.router.navigate(['/login']);
        // // you can save redirect url so after authing we can move them back to the page they requested
        // return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkLogin(): boolean {
        this.authService.checkAuthToken().then(data => {
            this.login = data;
            console.log(data);
        } );
        if (this.login) { return true; }

        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
    }
}
