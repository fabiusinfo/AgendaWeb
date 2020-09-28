import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any;

  constructor(public _userService: UserService) { }

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
  }

  login() {
    this._userService.login({'username': this.user.username, 'password': this.user.password});
  }

  refreshToken() {
    this._userService.refreshToken();
  }

  logout() {
    this._userService.logout();
  }


}
