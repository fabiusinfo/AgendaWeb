import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  /* Servicio para acceder a la API en Django de la tabla Places*/

  getAllPlaces(): Observable<any>{
    return this.http.get(this.baseurl + '/places/', {headers: this.httpHeaders});
  }
}
