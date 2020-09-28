import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloodService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAllBloods(): Observable<any>{
    return this.http.get(this.baseurl + '/blood/', {headers: this.httpHeaders});
  }

  updateBlood(blood): Observable<any>{
    const body ={blood_name:blood.blood_name, quantity:blood.quantity};
    return this.http.put(this.baseurl + '/blood/'+ blood.id +'/', body, {headers: this.httpHeaders});
  }
}
