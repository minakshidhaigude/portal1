import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private httpClient: HttpClient) {}

  createDemographics(
    pdemographics: any,
    pid: any,
    medication: any,
    immunization: any
  ): Observable<any> {
    debugger;
    console.log(localStorage.getItem('userDetails1.id'));
    return this.httpClient.post('/patient', {
      id: pid,
      demographics: pdemographics,
      medication: medication,
      immunization: immunization,
    });
  }

  updatePatient(
    pdemographics: any,
    pid: any,
    medication: any,
    immunization: any
  ): Observable<any> {
    console.log(localStorage.getItem('userDetails1.id'));
    return this.httpClient.put('/patient/' + pid, {
      id: pid,
      demographics: pdemographics,
      medication: medication,
      immunization: immunization,
    });
  }

  getPatientData(pid: any): Observable<any> {
    return this.httpClient.get('/patient/' + pid);
  }
}
