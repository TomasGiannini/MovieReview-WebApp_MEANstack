import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { getLocaleExtraDayPeriodRules } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // for storing jwt
  private token: string;
  // for telling if user is authenticated or not for the front end shit
  private authStatusListener = new Subject<boolean>();

  // used to make sure the edit/delete buttons show properly when ur logged in
  private isAuthenticated = false;

  private tokenTimer: any;

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
    this.http.post<{token: string, expiresIn: number }>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          // inform everyone subscribed to this variable tht the current user is authenticated
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
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
    clearTimeout(this.tokenTimer);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return ;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return ;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  // used to store token in browser local storage so u wont be logged out when reloading page
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
}
