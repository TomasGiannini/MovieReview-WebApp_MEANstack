import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})

export class LoginComponent {
  isLoading = false;
  adminString = '@admin.com';

  constructor(public authService: AuthService) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return ;
    }
    const email = form.value.email;

    // login a USER or ADMIN
    if (email.indexOf(this.adminString) !== -1) {
      this.authService.loginAdmin(form.value.email, form.value.password);
    } else {
      this.authService.login(form.value.email, form.value.password);
    }
  }
}
