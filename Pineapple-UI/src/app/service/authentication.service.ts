import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private authenticationUrl = 'http://localhost:8080/authenticate';

    constructor(
        private cookieService: CookieService,
        private http: HttpClient,
        private router: Router,
    ) { }

    public checkAuthToken(): Promise<boolean> {
        return this.http.post<boolean>(this.authenticationUrl, this.getAuthToken()).toPromise();
    }

    /**
     * Function to check if the current session is valid (User is logged in)
     * If session is invalid will delete the authentication cookie and redirect to the login screen
     */
    public authenticateUser(): Promise<boolean> {
        const check = this.checkAuthToken();
        check.then(data => {
            if (!data) {
                this.doUnauthorizedUserStuff();
            }
        });
        return check;
    }

    /**
     * Stores a session token as a cookie
     * @param authToken the token to store
     */
    public setAuthToken(authToken) {
        this.cookieService.set('authToken', authToken);
    }

    public clearAuthToken() {
        this.cookieService.delete('authToken', '/');
    }

    public getAuthToken(): string {
        return this.cookieService.get('authToken');
    }

    public checkToken(): boolean {
        return this.cookieService.check('authToken');
    }

    /**
     * Post function that sends the current session token
     */
    public post<T>(url, data) {
        return this.http.post<T>(url, data, { headers: this.getAuthorizedHeader()});
    }

    /**
     * Get function that sends the current session token
     */
    public get<T>(url) {
        return this.http.get<T>(url, {headers: this.getAuthorizedHeader()});
    }
    private getAuthorizedHeader(): HttpHeaders {
        // Headers are immutable so when appending header fields must use new returned object, Took me a while
        return new HttpHeaders().append('authorization', this.getAuthToken());
    }
    public logout() {
        this.doUnauthorizedUserStuff();
    }
    // This should probably be renamed to logout
    public doUnauthorizedUserStuff() {
        this.clearAuthToken();
        console.log('User not authorized... Redirecting');
        this.router.navigate(['login']);
    }
}
