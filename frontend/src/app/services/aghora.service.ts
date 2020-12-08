import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AgHoraService {
  baseurl = 'http://127.0.0.1:8000';
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});


  constructor(private http: HttpClient) { }

  getAllAppointments(): Observable<any> {
    return this.http.get(this.baseurl + '/appointment/', {headers: this.httpHeaders});
  }

  getAllDays(): Observable<any> {
    return this.http.get(this.baseurl + '/hour/', {headers: this.httpHeaders});
  }

  getAllHours(day: string): Observable<any> {
    return this.http.get(this.baseurl + '/hour?day=' + day, {headers: this.httpHeaders});
  }
  createHours(hour: { day: any; hour: any; available: any; }): Observable<any> {
    const body = {day: hour.day, hour: hour.hour, available: hour.available};
    return this.http.post(this.baseurl + '/hour/' , body, {headers: this.httpHeaders});
  }
  getAllUnconfirmedAppointments(token: string, useToken: boolean): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
    });
    if (useToken === true) {
      httpHeaders = httpHeaders.set('Authorization', 'JWT ' + token);
    }
    return this.http.get(this.baseurl + '/confirm_appointments', {headers: httpHeaders});
  }
  updateAppointment(appointment: { id: string; }, token: string, useToken: boolean): Observable<any> {
    const body = appointment;

    let httpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
    });
    if (useToken === true) {
      httpHeaders = httpHeaders.set('Authorization', 'JWT ' + token);
    }

    return this.http.patch(this.baseurl + '/appointment/' + appointment.id + '/', body, {headers: httpHeaders});
  }
  getHourbyAppointmendid(id: string, token: string): Observable<any> {
    return this.http.get(this.baseurl + '/hour1?id=' + id, {headers: new HttpHeaders({
      Authorization: 'JWT ' + token,
      'Content-type': 'application/json'
    })});
  }

  updateHour(hour: { available?: boolean; id?: any; }, token: string): Observable<any> {
    const body = hour;
    return this.http.patch(this.baseurl + '/hr/' + hour.id + '/', body, {headers: new HttpHeaders({
      Authorization: 'JWT ' + token,
      'Content-type': 'application/json'
    })});
  }

}


