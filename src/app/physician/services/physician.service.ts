import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhysicianService {
  // api = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {}
  getMyappointments(userId: string): Observable<any> {
    return this.httpClient.get(
      '/appointments?physicianid=' + userId + '&status=pending'
    );
  }
  getMyvisits(userId: string): Observable<any> {
    return this.httpClient.get(
      '/appointments?physicianid=' + userId + '&status=completed'
    );
  }
  createOrder(order: any): Observable<any> {
    return this.httpClient.post('/orders', order);
  }
  updateStatus(appid: any): Observable<any> {
    let jsonval: any = {
      status: 'completed',
    };
    return this.httpClient.patch('/appointments/' + appid, jsonval);
  }
  getAppointmentDetails(id): Observable<any> {
    return this.httpClient.get('/appointments', {
      params: {
        patientid: id,
      },
    });
  }
  updatePatientDemographics(patient, id): Observable<any> {
    console.log(patient);
    return this.httpClient.patch('/patient' + '/' + id, {
      demographics: patient,
    });
  }
  requestDataFromMultipleSources(appointmentid): Observable<any> {
    return this.httpClient.get('/orders?appointmentId=' + appointmentid);
  }
  getPatient(id: any): Observable<any> {
    return this.httpClient.get('/patient' + '/' + id);
  }
  getLastVisits(physicianId: any, patientId: any): Observable<any> {
    return this.httpClient.get(
      '/appointments?physicianid=' +
        physicianId +
        '&patientid=' +
        patientId +
        '&status=completed'
    );
  }
  getDiagnosisCodes() {
    return this.httpClient.get('/diagnosiscodes');
  }
  getProcedureCodes() {
    return this.httpClient.get('/procedurecodes');
  }
}
