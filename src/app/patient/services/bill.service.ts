import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private httpClient: HttpClient) {}
  getBill(id: number): Observable<any> {
    return this.httpClient.get('/billings/' + id);
  }
  /* createOrder(order): Observable<any> {
    return this.httpClient.post('https://api.razorpay.com/v1/orders', order, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  fetchOrder(id): Observable<any> {
    return this.httpClient.get('https://api.razorpay.com/v1/orders' + id, {
      headers: { 'Content-Type': 'application/json' },
    });
  } */
  updateBillings(obj: any): Observable<any> {
    return this.httpClient.put('/billings/' + obj.id, obj);
  }
}
