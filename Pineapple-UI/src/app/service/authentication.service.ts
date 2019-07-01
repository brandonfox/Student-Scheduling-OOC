import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticationUrl = 'http://localhost:8080/authenticate';
  constructor(
    private cookieService: CookieService,
    private http: HttpClient
  ) { }
  // Calls for a response from the server
  // Must handle the promise from the calling component
  // Access the data using a lambda stored into a private variable
  // Ex. checkAuthToken().then(data => this.authenticated = data);
  public checkAuthToken(): Promise<boolean> {
    return this.http.post<boolean>(this.authenticationUrl, this.getAuthToken()).toPromise();
  }
  public setAuthToken(authToken) {
    this.cookieService.set('authToken', authToken);
  }
  public getAuthToken() {
    return this.cookieService.get('authToken');
  }
}
