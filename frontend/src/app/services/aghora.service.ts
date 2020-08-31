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

  getAllAgHora(): Observable<any>{
    return this.http.get(this.baseurl + '/appointment/', {headers: this.httpHeaders});
  }
}


