import { Component, OnInit } from '@angular/core';
import { AgHoraService } from './services/aghora.service';
import {UserService} from './services/user.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AgHoraService]
})
export class AppComponent implements OnInit {
  public user: any;
  title = 'frontend';

  constructor(private aghora:AgHoraService, private _userService: UserService){
  }

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
