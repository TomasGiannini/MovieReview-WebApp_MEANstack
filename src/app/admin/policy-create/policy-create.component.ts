import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

// this is a custom built class template. We need to declare, import, etc
@Component({
  // selector used for creating html tag
  selector: 'app-policy-create',
  // where the component file is
  templateUrl: './policy-create.component.html',
  styleUrls: ['./policy-create.component.css']

})
export class PolicyCreateComponent implements OnInit {

  policy = '';
  signal = 0;

  constructor(public route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {}

  onCreatePolicy(postInput: HTMLTextAreaElement) {

  }

}
