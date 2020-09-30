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
  appointments = [{name:'placeholder',rut:'5.126.663-3',phone:'133',email:'email@email.email',rejected:false,accepted:false}] 
  gotData = false
  token = ''
  public user: any;
  hour;
  constructor(private http: HttpClient, private hours_api: AgHoraService,public _userService: UserService) {
  }
  getAllUnconfrimedAppointments = () =>{
    this.hours_api.getAllUnconfrimedAppointments(this.token).subscribe(
      data=>{
        this.appointments=data;
        console.log(data);
        console.log(this.appointments)
      },
      error=>{
        console.log(error);
      }
    )
  }
  getAppointments(){
    this.token = this._userService.token;
    this.getAllUnconfrimedAppointments();
  }
  acceptAppointment = (appointment) =>{
    this.token = this._userService.token;
    appointment.accepted = true;
    this.hours_api.updateAppointment(appointment,this.token).subscribe(
      data => {
        appointment = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }
  rejectAppointment(appointment){
    this.token = this._userService.token;
    appointment.rejected = true;
    this.hours_api.updateAppointment(appointment,this.token).subscribe(
      data => {
        appointment = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
    this.getHourAppointment(appointment.id);
    this.hour.available = true;
    this.hour.appointment_id = null;
    console.log(this.hour);
    this.hour.appointment_email =''
    this.hour.appointment_name = ''
    this.hours_api.updateHour(this.hour,this.token).subscribe(
      data =>{
        this.hour = data;
        console.log(data);
      },
      error=> {
        console.log(error);
      }
    )
  }
  getHourAppointment(id){
    this.token = this._userService.token;
    this.hours_api.getHourbyAppointmendid(id,this.token).subscribe(
      data => {
        this.hour = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
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
  datarefresh(){ // eventualmente me gustaria ponerle un timer al refresh, dejando esto para acordarme
    this.gotData = true;
  }

}

