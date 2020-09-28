import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegDonacionService {


  baseurl= "http://127.0.0.1:8000"
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});


  constructor(private http: HttpClient) { }
  getAllDonaciones(): Observable<any>{
    return this.http.get(this.baseurl + '/regdonacion/',   {headers: this.httpHeaders})
  }
  createDonation(newDonation): Observable<any>{
    const body ={lugar:newDonation.lugar,fecha:newDonation.fecha,rut:newDonation.rut,nombres:newDonation.nombres,
      apellido1:newDonation.apellido1,apellido2:newDonation.apellido2, sangre:newDonation.sangre};
    return this.http.post(this.baseurl + '/regdonacion/' , body, {headers: this.httpHeaders});
  }
}
