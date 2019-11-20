import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http'
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // retrieve token from the service
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      // set the token in the Authorization part of the header
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });

    return next.handle(authRequest);
  }
}
