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
  // Calls for a response from the server
  // Must handle the promise from the calling component
  // Access the data using a lambda stored into a private variable
  // Ex. checkAuthToken().then(data => this.authenticated = data);
  /**
   * @deprecated use authenticateUser instead
   */
  public checkAuthToken(): Promise<boolean> {
    return this.http.post<boolean>(this.authenticationUrl, this.getAuthToken()).toPromise();
  }
  public authenticateUser() {
    this.checkAuthToken().then(data => {
      if (!data) {
        this.doUnauthorizedUserStuff();
      }
    });
  }
  public setAuthToken(authToken) {
    this.cookieService.set('authToken', authToken);
  }
  public clearAuthToken() {
    this.cookieService.delete('authToken');
  }
  public getAuthToken(): string {
    return this.cookieService.get('authToken');
  }
  public post(url, data) {
    return this.http.post(url, data, { headers: this.getAuthorizedHeader()});
  }
  public get(url) {
    return this.http.get(url, {headers: this.getAuthorizedHeader()});
  }
  private getAuthorizedHeader(): HttpHeaders {
    // Headers are immutable so when appending header fields must use new returned object, Took me a while
    return new HttpHeaders().append('authorization', this.getAuthToken());
  }
  // This should probably be renamed to logout
  public doUnauthorizedUserStuff() {
    console.log('User not authorized... Redirecting');
    this.clearAuthToken();
    this.router.navigate(['login']);
  }
}
