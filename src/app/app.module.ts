import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  matExpansionAnimations,
  MatProgressSpinnerModule
} from '@angular/material';

import { AppComponent } from './app.component';
// importing the custom component/classes we made
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ReviewCreateComponent } from './reviews/review-create/review-create.component';
import { PostFilterPipe } from './posts/post-list/post-filter.pipe';
import { AdminCreateComponent } from './admin/admin-create/admin-create.component';
import { PolicyCreateComponent } from './admin/policy/policy-create/policy-create.component';
import { PolicyViewComponent } from './admin/policy/policy-view/policy-view.component';


@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    PolicyViewComponent,
    ReviewCreateComponent,
    HeaderComponent,
    AdminCreateComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    PostFilterPipe,
    PolicyCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  // telling angular tht for the 'HTTP_INTERCEPTORS' token, we want to provide it with a new value, aka with the interceptor class
  // mulit:true means dont overwrite existing interceptors, just look for new ones
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
