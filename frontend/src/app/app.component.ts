import { Component, OnInit } from '@angular/core';
import { AgHoraService } from './services/aghora.service';
import {UserService} from './services/user.service';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AgHoraService]
})
export class AppComponent implements OnInit {
  public user: any;
  title = 'frontend';
  flag = true;

  constructor(private aghora:AgHoraService, private _userService: UserService,router: Router,location: Location){
    router.events.subscribe(val => {
      if (location.path() != "/agendar"){
        this.flag = true;
      } else {
        this.flag = false;
      }
    })
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
