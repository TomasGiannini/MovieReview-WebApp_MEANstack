import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Policy } from './policy.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PolicyService {

private policy: Policy[] = [];
private policyUpdated = new Subject<Policy[]>();

constructor(private http: HttpClient, private router: Router) {}

getPolicies() {
  this.http.get<{message: string, policy: any}>(
    'http://localhost:3000/api/policy'
    )
    .pipe(map((policyData) => {
      return policyData.policy.map(policy => {
        return {
          id: policy._id,
          policy: policy.policy
        };
      });
    }))
  .subscribe((updatedPolicy) => {
    this.policy = updatedPolicy;
    this.policyUpdated.next([...this.policy]);
  });
}

getPolicyUpdateListener() {
  return this.policyUpdated.asObservable();
}

addPolicy(policy: string) {

  const apolicy: Policy = {
    policy: policy
  };
  this.http
  .post<{ message: string }>('http://localhost:3000/api/policy', apolicy)
    .subscribe(responseData => {
      this.router.navigate(['/']);
    });
}

}
