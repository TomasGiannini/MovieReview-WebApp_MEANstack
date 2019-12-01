import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tools-view',
  templateUrl: './tools-view.component.html'

})
export class ToolsViewComponent {

  document = 'This is a document used to describe how to use the site admin DMCA takedown tools';

  constructor(public route: ActivatedRoute, private authService: AuthService) {}

}
