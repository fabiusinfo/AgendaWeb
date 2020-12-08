import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignHoursService {
  baseurl = 'http://127.0.0.1:8000';
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

    getAllCampaignHours(campaignID: string): Observable<any> {
    return this.http.get(this.baseurl + '/hour/?campaign=' + campaignID, {headers: this.httpHeaders});
  }
}
