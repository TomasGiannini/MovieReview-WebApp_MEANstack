import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

// this is a custom built class template. We need to declare, import, etc
@Component({
  // selector used for creating html tag
  selector: 'app-admin-create',
  // where the component file is
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']

})
export class AdminCreateComponent{

  constructor(public route: ActivatedRoute, private authService: AuthService) {}

  onCreateAdmin(form: NgForm) {

    if (form.invalid){
      return;
    }

    // create the user in admin databaase
    this.authService.createAdmin(form.value.email, form.value.password);

    form.resetForm();

  }

}