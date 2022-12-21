import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class ProfileService {
  constructor(private http_client: HttpClient) {}

  getLastVisits(patientId: any): Observable<any> {
    return this.http_client.get('/appointments?patientid=' + patientId);
  }

  requestDataFromMultipleSources(appointmentid): Observable<any> {
    return this.http_client.get('/orders?appointmentId=' + appointmentid);
  }
}
