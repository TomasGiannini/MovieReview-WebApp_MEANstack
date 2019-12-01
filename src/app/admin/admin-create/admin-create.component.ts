import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';

// this is a custom built class template. We need to declare, import, etc
@Component({
  // selector used for creating html tag
  selector: 'app-admin-create',
  // where the component file is
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']

})
export class AdminCreateComponent{

  deleteUserURL = 'http://localhost:3000/api/user/delete/';

  constructor(public route: ActivatedRoute, private authService: AuthService, private http: HttpClient) {}

  onCreateAdmin(form: NgForm) {

    if (form.invalid){
      return;
    }

    // create the user in admin databaase
    this.authService.createAdmin(form.value.email, form.value.password);

    // delete user in normal database
    this.authService.deleteUser(form.value.email);

    form.resetForm();

  }

  onDeactivateUser(form: NgForm) {
    if (form.invalid) {
      return ;
    }

    // mark the user as deactivated
    this.authService.updateUser(form.value.email, form.value.password);
  }

  onReactivateUser(form: NgForm) {
    if (form.invalid) {
      return ;
    }

    // delete the user first
    this.http.delete(this.deleteUserURL + form.value.email)
      .subscribe(() => {
      });

    // re-create user with isDeactivated = false
    this.authService.createUser(form.value.email, form.value.password);
  }

}
