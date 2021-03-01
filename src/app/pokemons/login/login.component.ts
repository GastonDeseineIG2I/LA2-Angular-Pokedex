import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginResponse} from '../models/loginResponse.model';

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

  ngOnInit(): void {

  }

  login(): void {

  }

}
