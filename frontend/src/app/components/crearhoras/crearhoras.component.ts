import { Component, OnInit } from '@angular/core';
import { AgHoraService } from 'src/app/services/aghora.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker/src/app/material-timepicker/models/ngx-material-timepicker-theme.interface';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-crearhoras',
  templateUrl: './crearhoras.component.html',
  styleUrls: ['./crearhoras.component.css']
})
export class CrearhorasComponent implements OnInit {

  redTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#5E091A',
        buttonColor: '#fff'
    },
    dial: {
        dialBackgroundColor: '#880C25',
    },
    clockFace: {
        clockFaceBackgroundColor: '#880C25',
        clockHandColor: '#008BA7',
        clockFaceTimeInactiveColor: '#fff'
    }
  };

  public user: any;
  dia: string;
  horaInicio: string;
  horaFinal: string;

  // Se puede asignar el tiempo que tomen las horas tambien pero habiamos
  // acordado 30min asi que esta hardcodeado

  constructor(private http: HttpClient, public userService: UserService) {
  }
  createHours() {
    const day = new Date(this.dia);
    this.dia = day.toISOString().split('T')[0];
    const horai = Number(this.horaInicio[0] + this.horaInicio[1]);
    let mini = Number(this.horaInicio[3] + this.horaInicio[4]) + horai * 60;
    const horaf = Number(this.horaFinal[0] + this.horaFinal[1]);
    const minf = Number(this.horaFinal[0] + this.horaFinal[1]) + horaf * 60;
    // Se agrega el token de autorización al header
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'JWT ' + this.userService.token
      })
    };

    while (mini <= minf - 30) {
      const uploadData = new FormData();
      uploadData.append('day', this.dia);
      uploadData.append('hour', (Math.floor(mini / 60)) + ':' + (mini % 60).toString());
      uploadData.append('available', 'true');
      this.http.post('http://127.0.0.1:8000/new_hour', uploadData, httpOptions).subscribe(
        data => {console.log(data); },
        error => {console.log(error); }
      );
      mini = mini + 30;
    }
  }

  ngOnInit(): void {
    this.user = {
      username: '',
      password: ''
    };
  }

  login() {
    this.userService.login({username: this.user.username, password: this.user.password});
  }

  refreshToken() {
    this.userService.refreshToken();
  }

  logout() {
    this.userService.logout();
  }

}
