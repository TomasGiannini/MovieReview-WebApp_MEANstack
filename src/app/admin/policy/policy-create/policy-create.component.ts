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
  templateUrl: './policy-create.component.html',
  styleUrls: ['./policy-create.component.css']

})
export class PolicyCreateComponent implements OnInit {

  policies: Policy[] = [];
  private policySub: Subscription;
  public isPolicy = 0;


  constructor(public route: ActivatedRoute, private authService: AuthService, private policyService: PolicyService) {}

  ngOnInit() {

    this.policyService.getPolicies();
    this.policySub = this.policyService.getPolicyUpdateListener()
      .subscribe((policys: Policy[]) => {
        this.policies = policys;
      });
    this.isPolicy = this.policyService.getIsPolicy();

  }

  onCreatePolicy(form: NgForm) {

    if (form.invalid) {
      return ;
    }

    console.log('title: ' + form.value.title);
    console.log('policy: ' + form.value.policy);

    // add new policy
    this.policyService.addPolicy(form.value.title, form.value.policy);

    form.resetForm();
  }

  onUpdatePolicy(form: NgForm) {

    if (form.invalid) {
      return ;
    }

    // delete old policy
    this.policyService.deletePolicy(form.value.oldTitle);

    // add new one
    this.policyService.addPolicy(form.value.newTitle, form.value.newPolicy);


    form.resetForm();
  }

}
