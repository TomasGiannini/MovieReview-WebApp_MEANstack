import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  // allows this class to subscribe to shit
  private authListenerSubs: Subscription;
  // admin version
  private adminauthListenerSubs: Subscription;
  userIsAuthenticated = false;
  // admin version
  adminIsAuthenticated = false;


  // declaring use of authService class
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    // setting the subscription component of this class to subscribe to the observable in the other class
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    // ADMIN VERSION
    this.adminIsAuthenticated = this.authService.getAdminIsAuth();
    // ADMIN VERSION
    this.adminauthListenerSubs = this.authService.getAdminAuthStatusListener()
        .subscribe(isadminAuthenticated => {
          this.adminIsAuthenticated = isadminAuthenticated;
        });
  }

  // clear the token and inform all interested parties about the change
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.adminauthListenerSubs.unsubscribe();
  }

}
