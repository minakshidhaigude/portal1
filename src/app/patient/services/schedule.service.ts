import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private httpClient: HttpClient) {}

  getPhysicians(): Observable<any> {
    let role = 'physician';
    return this.httpClient.get('/users?role=' + role, {});
  }
  createAppointment(appdata: any): Observable<any> {
    return this.httpClient.post('/appointments', appdata, {});
  }

  editAppointment(id: any, appdata: any): Observable<any> {
    return this.httpClient.put('/appointments/' + id, appdata, {});
  }

  getAppointents(): Observable<any> {
    return this.httpClient.get('/appointments', {});
  }

  getAppointentsById(id: any): Observable<any> {
    return this.httpClient.get('/appointments/' + id, {});
  }

  deleteAppointentsById(id: any): Observable<any> {
    return this.httpClient.delete('/appointments/' + id, {});
  }
}
