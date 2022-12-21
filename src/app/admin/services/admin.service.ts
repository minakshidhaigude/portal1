import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  status: boolean;
  constructor(private httpClient: HttpClient) {}
  getUsers(): Observable<any> {
    return this.httpClient.get('/users');
  }
  updateStatus(user: { id: string; active: boolean }) {
    this.status = user.active;
    console.log(this.status);

    return this.httpClient.patch(
      '/users' + '/' + user.id,

      { active: this.status }
    );
  }
  getPatient(id): Observable<any> {
    return this.httpClient.get('/patient' + '/' + id);
  }
  updatePatientDemographics(patient, id): Observable<any> {
    console.log(patient);

    return this.httpClient.patch('/patient' + '/' + id, {
      demographics: patient,
    });
  }
  updatePatientImmunization(patient, id): Observable<any> {
    console.log(patient);

    return this.httpClient.patch('/patient' + '/' + id, {
      immunization: patient,
    });
  }
  getAppointmentDetails(id): Observable<any> {
    return this.httpClient.get('/appointments', {
      params: {
        patientid: id,
      },
    });
  }
  getPhysician(id): Observable<any> {
    return this.httpClient.get('/users', {
      params: {
        id: id,
      },
    });
  }
  getPatientVitals(id): Observable<any> {
    return this.httpClient.get('/orders', {
      params: {
        appointmentId: id,
      },
    });
  }
  getAppointments(appointment): Observable<any> {
    let response1 = this.httpClient.get('/users', {
      params: {
        id: appointment.physicianid,
      },
    });
    let response2 = this.httpClient.get('/orders', {
      params: {
        appointmentId: appointment.id,
      },
    });
    return forkJoin([response1, response2]);
  }
  getAllAppointments(): Observable<any> {
    return this.httpClient.get('/appointments', {
     
    });
  }
}
