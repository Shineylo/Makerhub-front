import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../service/login.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard  {

  constructor(private readonly _loginService: LoginService, private readonly _router: Router) {
  }

  canActivate(): boolean  {
    if(!this._loginService.connected){
      this._router.navigateByUrl("/auth/login");
    }
    return this._loginService.connected;
  }

}

