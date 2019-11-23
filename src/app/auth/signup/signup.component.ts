import { Component } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.css']
})

export class SignupComponent {
  isLoading = false;
  adminString = '@admin.com';

  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;

    // signup a USER or ADMIN
    if (email.indexOf(this.adminString) !== -1) {
      this.authService.createAdmin(form.value.email, form.value.password);
    } else {
      this.authService.createUser(form.value.email, form.value.password);
    }
  }
}
