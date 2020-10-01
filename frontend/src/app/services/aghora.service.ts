import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AgHoraService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});


  constructor(private http:HttpClient) { }

  getAllAppointments(): Observable<any>{
    return this.http.get(this.baseurl + '/appointment/', {headers: this.httpHeaders});
  }

  getAllDays(): Observable<any>{
    return this.http.get(this.baseurl + '/hour', {headers: this.httpHeaders});
  }

  getAllHours(day): Observable<any>{
    return this.http.get(this.baseurl + '/hour?day='+day, {headers: this.httpHeaders});
  }
  createHours(hour): Observable<any>{
    const body ={day:hour.day,hour:hour.hour,available:hour.available};
    return this.http.post(this.baseurl + '/hour/' , body, {headers: this.httpHeaders});
  }
  getAllUnconfrimedAppointments(token): Observable<any>{
    return this.http.get(this.baseurl + '/confirm_appointments', {headers: new HttpHeaders({
      'Authorization': 'JWT ' + token,
      'Content-type': 'application/json'
    })});
  }
  updateAppointment(appointment,token): Observable<any>{
    const body = appointment
    return this.http.patch(this.baseurl + '/appointment/' + appointment.id + '/',body, {headers: new HttpHeaders({
      'Authorization': 'JWT ' + token,
      'Content-type': 'application/json'
    })});
  }
  getHourbyAppointmendid(id,token): Observable<any>{
    return this.http.get(this.baseurl + '/hour1?id='+id, {headers: new HttpHeaders({
      'Authorization': 'JWT ' + token,
      'Content-type': 'application/json'
    })});
  }

  updateHour(hour,token): Observable<any>{
    const body = hour
    return this.http.patch(this.baseurl + '/hr/' + hour.id + '/', body, {headers: new HttpHeaders({
      'Authorization': 'JWT ' + token,
      'Content-type': 'application/json'
    })});
  }

}


