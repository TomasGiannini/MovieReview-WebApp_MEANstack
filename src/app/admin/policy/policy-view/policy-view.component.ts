import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { PolicyService } from '../policy.service';
import { Policy } from '../policy.model';
import { Subscription } from 'rxjs';

// this is a custom built class template. We need to declare, import, etc
@Component({
  // selector used for creating html tag
  selector: 'app-policy-create',
  // where the component file is
  templateUrl: './policy-view.component.html'

})
export class PolicyViewComponent implements OnInit {

  policies: Policy[] = [];
  private policySub: Subscription;
  private isPolicy = 0;

  constructor(public route: ActivatedRoute, private authService: AuthService, private policyService: PolicyService) {}

  ngOnInit() {

    this.policyService.getPolicies();
    this.policySub = this.policyService.getPolicyUpdateListener()
      .subscribe((policys: Policy[]) => {
        this.policies = policys;
      });
    this.isPolicy = this.policyService.getIsPolicy();

  }

}
