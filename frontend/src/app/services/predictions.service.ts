import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionsService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  /* Servicio para acceder a la API en Django de la tabla Predictions*/

  getPredictionsData(): Observable<any>{
    return this.http.get(this.baseurl + '/eval_model', {headers: this.httpHeaders});
  }
}
