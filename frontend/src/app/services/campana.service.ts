import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampanaService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  //crud de campañas, uso para mostrar campañas y para ingresar campaña

  getAllCampanas(): Observable<any>{
    return this.http.get(this.baseurl + '/campanas/', {headers: this.httpHeaders});
  }

  getOneCampana(id): Observable<any>{
    return this.http.get(this.baseurl + '/campanas/'+ id +'/', {headers: this.httpHeaders});
  }
  updateCampana(campana): Observable<any>{
    const body ={lugar:campana.lugar,dia_inicio:campana.dia_inicio,dia_termino:campana.dia_termino,
       hora_inicio:campana.hora_inicio,hora_termino:campana.hora_termino,imagen:campana.imagen};
    return this.http.put(this.baseurl + '/campanas/'+ campana.id +'/', body, {headers: this.httpHeaders});
  }

  createCampana(campana): Observable<any>{
    const body ={lugar:campana.lugar,dia_inicio:campana.dia_inicio,dia_termino:campana.dia_termino,
      hora_inicio:campana.hora_inicio,hora_termino:campana.hora_termino,imagen:campana.imagen};
    return this.http.post(this.baseurl + '/campanas/' , body, {headers: this.httpHeaders});
  }

  deleteCampana(id): Observable<any>{
    return this.http.delete(this.baseurl + '/campanas/'+ id +'/',  {headers: this.httpHeaders});
  }

}
