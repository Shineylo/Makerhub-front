import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginService} from "../service/login.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private readonly _loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const user = this._loginService.user;


    if( user ){
      const authReq = request.clone({
        headers: request.headers.set("Authorization", user.token)
      })

      return next.handle(authReq);
    }


    return next.handle(request);
  }
}
