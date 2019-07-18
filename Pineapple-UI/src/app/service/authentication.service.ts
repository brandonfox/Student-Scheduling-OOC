import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { CookieService} from 'ngx-cookie-service';
import {User} from '../model/user';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private authenticationUrl = environment.backendUrl + '/authenticate';

    constructor(
        private cookieService: CookieService,
        private http: HttpClient,
    ) { }

    /**
     * Function to check if the current session is valid (User is logged in)
     * If session is invalid will delete the authentication cookie and redirect to the login screen
     */
    public authenticateUser(): boolean {
        const check = this.checkAuthToken();
        if (!check) {
            this.logout();
        }
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
        return this.cookieService.delete('authToken', '/');
    }

    public getAuthToken(): string {
        return this.cookieService.get('authToken');
    }

    public checkAuthToken(): boolean {
        return this.cookieService.check('authToken');
    }

    /**
     * Post function that sends the current session token
     */
    public post<T>(url, data, params?: HttpParams) {
        return this.http.post<T>(url, data, { headers: this.getAuthorizedHeader(), params});
    }

    /**
     * Get function that sends the current session token
     */
    public get<T>(url, params?: HttpParams) {
        return this.http.get<T>(url, {headers: this.getAuthorizedHeader(), params});
    }

    public delete<T>(url, params?: HttpParams) {
        return this.http.delete<T>(url, {headers: this.getAuthorizedHeader(), params});
    }

    public put<T>(url, data, params?: HttpParams) {
        return this.http.put<T>(url, data, {headers: this.getAuthorizedHeader(), params});
    }

    private getAuthorizedHeader(): HttpHeaders {
        // Headers are immutable so when appending header fields must use new returned object, Took me a while
        return new HttpHeaders().append('authorization', this.getAuthToken());
    }

    public logout() {
        this.clearAuthToken();
        console.log('User not authorized... Redirecting');
    }

    /**
     * Get User information for the currently logged in user
     */
    public getLoggedUser(): Promise<User> {
        return this.get<User>(this.authenticationUrl + '/loggedUserInfo').toPromise();
    }
}
