import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { PolicyService } from '../policy.service';
import { Subscription } from 'rxjs';
import { Takedown } from '../takedown.model';

// this is a custom built class template. We need to declare, import, etc
@Component({
  selector: 'app-takedown-create',
  templateUrl: './takedown-create.component.html'

})
export class TakedownCreateComponent implements OnInit {

  takedownsies: Takedown[] = [];
  private takedownSub: Subscription;
  public isTakedown = 0;


  constructor(public route: ActivatedRoute, private authService: AuthService, private policyService: PolicyService) {}

  ngOnInit() {

    this.policyService.getTakedowns();
    this.takedownSub = this.policyService.getTakedownUpdateListener()
      .subscribe((takedowns: Takedown[]) => {
        this.takedownsies = takedowns;
      });
    this.isTakedown = this.policyService.getIsTakedown();

  }

  onCreateTakedown(form: NgForm) {

    if (form.invalid) {
      return ;
    }
    // add new takedown
    this.policyService.addTakedown(form.value.takedownTitle, form.value.takedown);
    form.resetForm();
  }

  onUpdateTakedown(form: NgForm) {

    if (form.invalid) {
      return ;
    }

    console.log('old takedown name: ' + form.value.oldTakedownTitle);

    // delete existing takedown
    this.policyService.deleteTakedown(form.value.oldTakedownTitle);

    // add new takedown
    this.policyService.addTakedown(form.value.newTakedownTitle, form.value.newtakedown);
    form.resetForm();
  }

}
