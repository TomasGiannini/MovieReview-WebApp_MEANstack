import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // for storing jwt
  private token: string;
  // for telling if user is authenticated or not for the front end shit
  private authStatusListener = new Subject<boolean>();

  // used to make sure the edit/delete buttons show properly when ur logged in
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    // return auth status as an observable so other components can subscribe and react accorindgly to changes
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string ) {
    const authData: AuthData = { email: email, password: password }
    this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password }
    this.http.post<{token: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          // inform everyone subscribed to this variable tht the current user is authenticated
          this.authStatusListener.next(true);
          this.saveAuthData(token);
          // navigate back to homepage when logged in
          this.router.navigate(['/']);
        }
      });
  }


  logout() {
    this.token = null;
    this.isAuthenticated = false;
    // sends a signal to the parties subscribed
    this.authStatusListener.next(false);
    this.clearAuthData();
    // navigate back to homepage when logged out
    this.router.navigate(['/']);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    if (!token) {
      return ;
    }
    return {
      token: token
    }
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
  }

  // used to store token in browser local storage so u wont be logged out when reloading page
  private saveAuthData(token: string) {
    localStorage.setItem('token', token);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
  }
}
