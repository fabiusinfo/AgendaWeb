import { Component, OnInit } from '@angular/core';
import { AgHoraService } from 'src/app/services/aghora.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker/src/app/material-timepicker/models/ngx-material-timepicker-theme.interface';
import {UserService} from '../../services/user.service';
import { CampanaService } from 'src/app/services/campana.service';


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
  useToken = true;

  campaigns: any;
  campaign: any;

  // Se puede asignar el tiempo que tomen las horas tambien pero habiamos
  // acordado 30min asi que esta hardcodeado

  constructor(private http: HttpClient, public userService: UserService, private campanasApi: CampanaService) {
    this.getCampaigns();
    this.setTestingOptions();
  }

  // TODO: Mover lógica a backend como transacción atómica
  createHours() {
    const day = new Date(this.dia);
    this.dia = day.toISOString().split('T')[0];
    const horai = Number(this.horaInicio[0] + this.horaInicio[1]);
    let mini = Number(this.horaInicio[3] + this.horaInicio[4]) + horai * 60;
    const horaf = Number(this.horaFinal[0] + this.horaFinal[1]);
    const minf = Number(this.horaFinal[0] + this.horaFinal[1]) + horaf * 60;

    let httpHeaders = new HttpHeaders({
      });

    if (this.useToken === true) {
      // Se agrega el token de autorización al header
    // Se agrega el token de autorización al header
      httpHeaders = httpHeaders.set('Authorization', 'JWT ' + this.userService.token);
    }

    while (mini <= minf - 30) {
      const uploadData = new FormData();
      uploadData.append('campaign_id', this.campaign.id);
      uploadData.append('day', this.dia);
      uploadData.append('hour', (Math.floor(mini / 60)) + ':' + (mini % 60).toString());
      uploadData.append('available', 'true');
      this.http.post('http://127.0.0.1:8000/new_hour', uploadData, {headers: httpHeaders}).subscribe(
        data => {console.log(data); },
        error => {console.log(error); }
      );
      mini = mini + 30;
    }
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

  getCampaigns = () => {
    this.campanasApi.getAllCampanas().subscribe(
      (data: any[]) => {
        this.campaigns = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setTestingOptions() {
    this.useToken = false;

  }


  ngOnInit(): void {

    this.user = {
      username: '',
      password: ''
    };
  }

}
