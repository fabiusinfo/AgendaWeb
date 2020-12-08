import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AgHoraService } from 'src/app/services/aghora.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-confirmarhoras',
  templateUrl: './confirmarhoras.component.html',
  styleUrls: ['./confirmarhoras.component.css']
})
export class ConfirmarhorasComponent implements OnInit {
  appointments = [{name: 'placeholder', rut: '5.126.663-3', phone: '133', email: 'email@email.email', rejected: false, accepted: false}];
  useToken = true;
  token = '';
  public user: any;
  hour: { available: boolean; };

  constructor(private hoursApi: AgHoraService, public userService: UserService) {
  }

  getAllUnconfirmedAppointments = () => {
    this.hoursApi.getAllUnconfirmedAppointments(this.token, false).subscribe(
      data => {
        this.appointments = data;
        console.log(data);
        console.log(this.appointments);
      },
      error => {
        console.log(error);
      }
    );
  }
  getAppointments() {
    this.token = this.userService.token;
    this.getAllUnconfirmedAppointments();
  }

  modifyAppointment(appointment: any, accept: boolean) {
    this.token = this.userService.token;
    if (accept === true) {
      appointment.accepted = true;
    } else {
      appointment.rejected = true;
    }
    this.hoursApi.updateAppointment(appointment, this.token, this.useToken).subscribe(
      data => {
        appointment = data;
        console.log(data);
        this.getAppointments();
      },
      error => {
        console.log(error);
      }
    );
  }

  getHourAppointment(id) {
    this.token = this.userService.token;
    this.hoursApi.getHourbyAppointmendid(id, this.token).subscribe(
      data => {
        this.hour = data[0];
        console.log(this.hour);
      },
      error => {
        console.log(error);
      }
    );
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

  setTestingOptions() {
    this.useToken = false;
    this.userService.token = '';
  }

  ngOnInit(): void {
    // TODO: Eliminar linea cuando esté implementado el login
    this.setTestingOptions();
    this.getAppointments();
    this.user = {
      username: '',
      password: ''
    };
  }
}

