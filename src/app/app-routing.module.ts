import { NgModule } from '@angular/core';
import { PostListComponent } from './posts/post-list/post-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { ReviewCreateComponent } from './reviews/review-create/review-create.component';
import { AdminCreateComponent } from './admin/admin-create/admin-create.component';
import { PolicyCreateComponent } from './admin/policy/policy-create/policy-create.component';
import { PolicyViewComponent } from './admin/policy/policy-view/policy-view.component';
import { TakedownCreateComponent } from './admin/policy/takedown-create/takedown-create.component';
import { TakedownViewComponent } from './admin/policy/takedown-view/takedown-view.component';
import { ToolsViewComponent } from './admin/tools/tools-view/tools-view.component';

// routing to files which take care of different things
const routes: Routes = [
  { path: '', component: PostListComponent },
  // create and edit use the AuthGuard service file to protect from un-auth users
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'addReview/:postTitle', component: ReviewCreateComponent },
  { path: 'addAdmin', component: AdminCreateComponent },
  { path: 'addPolicy', component: PolicyCreateComponent },
  { path: 'viewPolicy', component: PolicyViewComponent },
  { path: 'addTakedown', component: TakedownCreateComponent },
  { path: 'viewTakedown', component: TakedownViewComponent },
  { path: 'viewTools', component: ToolsViewComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
