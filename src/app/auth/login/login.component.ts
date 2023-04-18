import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  badcredentials: boolean = false;

  constructor(private readonly _loginService: LoginService, private readonly _router : Router){
    this.form = new FormGroup({
      'username': new FormControl(''),
      'password': new FormControl('')
    })
  }

  onSubmit(){
    if( this.form.valid ){
      this._loginService.login(this.form.value).subscribe(
        {
          next: value => this._router.navigateByUrl("/home"),
          error: (error) => this.badcredentials = true

        }
      )
    }
  }
}
