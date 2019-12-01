import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Policy } from './policy.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Takedown } from './takedown.model';

@Injectable({providedIn: 'root'})
export class PolicyService {

private policy: Policy[] = [];
private policyUpdated = new Subject<Policy[]>();
private isPolicy = 0;

private takedown: Takedown[] = [];
private takedownUpdated = new Subject<Takedown[]>();
private isTakedown = 0;

getPolicyURL = 'http://localhost:3000/api/policy';
getTakedownURL = 'http://localhost:3000/api/takedown';
addPolicyURL = 'http://localhost:3000/api/policy';
addTakedownURL = 'http://localhost:3000/api/takedown';
deletePolicyURL = 'http://localhost:3000/api/policy/delete/';
deleteTakedownURL = 'http://localhost:3000/api/takedown/delete/';

constructor(private http: HttpClient, private router: Router) {}

getPolicies() {
  this.http.get<{message: string, policy: any, title: string}>(this.getPolicyURL)
    .pipe(map((policyData) => {
      return policyData.policy.map(policy => {
        return {
          id: policy._id,
          policy: policy.policy,
          title: policy.title
        };
      });
    }))
  .subscribe((updatedPolicy) => {
    this.policy = updatedPolicy;
    this.policyUpdated.next([...this.policy]);
  });
}

getTakedowns() {
  this.http.get<{message: string, takedown: any, title: string}>(this.getTakedownURL)
    .pipe(map((takedownData) => {
      return takedownData.takedown.map(takedown => {
        return {
          id: takedown._id,
          takedown: takedown.takedown,
          title: takedown.title
        };
      });
    }))
  .subscribe((updatedTakedown) => {
    this.takedown = updatedTakedown;
    this.takedownUpdated.next([...this.takedown]);
  });
}

getPolicyUpdateListener() {
  return this.policyUpdated.asObservable();
}

getTakedownUpdateListener() {
  return this.takedownUpdated.asObservable();
}

addPolicy(title: string, policy: string) {

  // add the updated policy
  const apolicy: Policy = {
    title: title,
    policy: policy
  };
  this.http
  .post<{ message: string }>(this.addPolicyURL, apolicy)
    .subscribe(responseData => {
      this.router.navigate(['/']);
    });

  this.isPolicy = 1;
}

addTakedown(title: string, takedown: string) {

  const atakedown: Takedown = {
    title: title,
    takedown: takedown
  };
  this.http
  .post<{ message: string, takedown: string }>(this.addTakedownURL, atakedown)
    .subscribe(responseData => {
      this.router.navigate(['/']);
    });

  this.isTakedown = 1;
}

getIsPolicy() {
  return this.isPolicy;
}

getIsTakedown() {
  return this.isTakedown;
}

deletePolicy(title: string) {

  // deletes the policy
  this.http.delete(this.deletePolicyURL + title)
    .subscribe(() => {
    });
}

deleteTakedown(title: string) {

  // deletes the policy
  this.http.delete(this.deleteTakedownURL + title)
    .subscribe(() => {
    });
}

}
