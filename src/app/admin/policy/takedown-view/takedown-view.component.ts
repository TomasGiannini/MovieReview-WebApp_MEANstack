import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { PolicyService } from '../policy.service';
import { Subscription } from 'rxjs';
import { Takedown } from '../takedown.model';

// this is a custom built class template. We need to declare, import, etc
@Component({
  selector: 'app-takedown-view',
  templateUrl: './takedown-view.component.html'

})
export class TakedownViewComponent implements OnInit {

  takedownsies: Takedown[] = [];
  private takedownSub: Subscription;
  private isTakedown = 0;

  constructor(public route: ActivatedRoute, private authService: AuthService, private policyService: PolicyService) {}

  ngOnInit() {

    this.policyService.getTakedowns();
    this.takedownSub = this.policyService.getTakedownUpdateListener()
      .subscribe((takedowns: Takedown[]) => {
        this.takedownsies = takedowns;
      });
    this.isTakedown = this.policyService.getIsTakedown();
    console.log(this.takedownsies);

  }

}
