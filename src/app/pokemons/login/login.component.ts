import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginResponse} from '../models/loginResponse.model';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'pkm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(
    private router: Router,
    private route: ActivatedRoute) {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  pass = new FormControl('', [Validators.required]);
  hidePass = true;

  ngOnInit(): void {

  }

  login(): void {

  }

  getErrorMessage( field: string ): string {
    if ( field === 'email'){
      if (this.email.hasError('required')) {
        return 'Vous devez entrer une valeur';
      }
      return this.email.hasError('email') ? 'Format d\'email invalide' : '';
    }else if ( field === 'pass' ){
      if (this.pass.hasError('required')) {
        return 'Vous devez entrer une valeur';
      }
    }else{
      return '';
    }
  }
}
