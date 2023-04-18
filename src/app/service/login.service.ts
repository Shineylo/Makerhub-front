import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, tap} from "rxjs";
import {Router} from "@angular/router";

export interface Auth {
  token: string,
  refreshToken: string;
  username: string;
  roles: string[];
}

export interface LoginForm {
  username: string;
  password: string;
}

@Injectable()
export class LoginService {

  private readonly AUTH_STORAGE_KEY = "user_data";
  private readonly _connectedSubject= new BehaviorSubject(this.connected)

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _router: Router
  ) {}

  login(form: LoginForm ){
    return this._httpClient.post<Auth>("http://localhost:8080/api/auth/login", form).pipe(
      tap(data => {
        this.user = data;
        this._connectedSubject.next( this.connected );
      }),
      catchError( (err) => {throw new Error(err.message);
      }),
    )
  }
  logout(){
    this.user = undefined;
    this._connectedSubject.next( this.connected );
    this._router.navigateByUrl("auth/login");
  }


  get user(): Auth | undefined {
    const userJson = localStorage.getItem(this.AUTH_STORAGE_KEY)

    if( userJson )
      return JSON.parse( userJson );

    return undefined;
  }

  private set user(user: Auth | null | undefined){

    if( !user)
      localStorage.removeItem(this.AUTH_STORAGE_KEY);
    else
      localStorage.setItem(this.AUTH_STORAGE_KEY, JSON.stringify(user));
  }

  get connected(){
    return this.user !== undefined
  }

  get connected$() {
    return this._connectedSubject.asObservable();
  }
}
