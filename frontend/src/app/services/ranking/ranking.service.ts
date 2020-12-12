import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  private baseurl = 'http://127.0.0.1:8000';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  // crud de campañas, uso para mostrar campañas y para ingresar campaña

  getRankingPoints(): Observable<any> {
    return this.http.get(this.baseurl + '/api/ranking/', {headers: this.httpHeaders});
  }

}
