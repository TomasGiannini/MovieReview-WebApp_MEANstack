import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { User } from '../../../backend/models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // for storing jwt
  private token: string;
  // for telling if user is authenticated or not for the front end shit
  private authStatusListener = new Subject<boolean>();
  private adminauthStatusListener = new Subject<boolean>();

  // used to make sure the edit/delete buttons show properly when ur logged in
  private isAuthenticated = false;
  // same thing but for admin
  private adminIsAuthenticated = false;

  private tokenTimer: any;
  private userId: string;
  // same thing but for admin
  private adminId: string;

  userSignupURL = 'http://localhost:3000/api/user/signup';
  adminSignupURL = 'http://localhost:3000/api/admin/signup';
  userLoginURL = 'http://localhost:3000/api/user/login';
  adminLoginUrl = 'http://localhost:3000/api/admin/login';
  deleteUserURL = 'http://localhost:3000/api/user/delete/';
  userSignupDEACURL = 'http://localhost:3000/api/user/signupDEAC';

  //for deactivating


  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getAdminId() {
    return this.adminId;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  // ADMIN version
  getAdminIsAuth() {
    return this.adminIsAuthenticated;
  }

  getAuthStatusListener() {
    // return auth status as an observable so other components can subscribe and react accorindgly to changes
    return this.authStatusListener.asObservable();
  }

  // ADMIN version
  getAdminAuthStatusListener() {
    // return auth status as an observable so other components can subscribe and react accorindgly to changes
    return this.adminauthStatusListener.asObservable();
  }

// creates normal users
createUser(email: string, password: string ) {
    const authData: AuthData = { email: email, password: password};
    this.http.post<{ userId: string }>(this.userSignupURL, authData)
      .subscribe(response => {
        const id = response.userId;
        console.log(id);
      });
    this.router.navigate(['/']);
  }

// creates admins
createAdmin(email: string, password: string) {
    const authData: AuthData = { email: email, password: password};
    this.http.post(this.adminSignupURL, authData)
      .subscribe(response => {
        console.log(response);
      });
    this.router.navigate(['/']);
  }

login(email: string, password: string) {

    const authData: AuthData = { email: email, password: password }
    this.http.post<{token: string, expiresIn: number, userId: string, isDeactivated: boolean }>(this.userLoginURL, authData)
      .subscribe(response => {
        if (response.isDeactivated === true) {
          alert('User is deactivated. Contact site admin');
          return ;
        }
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          // inform everyone subscribed to this variable tht the current user is authenticated
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId);
          // navigate back to homepage when logged in
          this.router.navigate(['/']);
        }
      });
    setTimeout(() => {
    if (!this.getIsAuth()) {
      alert('Username/Password is incorrect');
    }
    }, 3000);
  }

  loginAdmin(email: string, password: string) {

    const authData: AuthData = { email: email, password: password }
    this.http.post<{token: string, expiresIn: number, adminId: string }>(this.adminLoginUrl, authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.adminIsAuthenticated = true;
          this.adminId = response.adminId;
          // inform everyone subscribed to this variable tht the current user is authenticated
          this.adminauthStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.adminId);
          // navigate back to homepage when logged in
          this.router.navigate(['/']);
        }
      });
  setTimeout(() => {
    if (!this.getAdminIsAuth()) {
      alert('Username/Password is incorrect');
      }
    }, 3000);
  }


  logout() {
    this.token = null;
    this.isAuthenticated = false;

    // admin version
    this.adminIsAuthenticated = false;
    // sends a signal to the parties subscribed
    this.authStatusListener.next(false);

    // admin version
    this.adminauthStatusListener.next(false);
    this.clearAuthData();

    this.userId = null;
    // admin version
    this.adminId = null;

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
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return ;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }

  // sign user in based on data in local storage
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
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  // used to store token in browser local storage so u wont be logged out when reloading page
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  updateUser(email: string, password: string) {

    // deletes the user
    this.http.delete(this.deleteUserURL + email)
      .subscribe(() => {
      });

    // re-creates the deacticvated user
    const authData: AuthData = { email: email, password: password};
    this.http.post<{ userId: string }>(this.userSignupDEACURL, authData)
      .subscribe(response => {
      });
    this.router.navigate(['/']);
  }

  deleteUser(email: string) {

    // deletes the user
    this.http.delete(this.deleteUserURL + email)
      .subscribe(() => {
      });
  }
}
