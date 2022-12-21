import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { Register } from '../model/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = '';
  constructor(private httpClient: HttpClient) {}
  public set authToken(token: string) {
    this.token = token;
  }
  public get authToken() {
    return this.token;
  }
  createUser(user: Register): Observable<any> {
    return this.httpClient.post('/register', user);
  }
  loginUser(user: Login): Observable<any> {
    return this.httpClient.post('/login', user);
  }
  sendEmail(email: {}): any {
    return this.httpClient.post('/forgotpw', email);
  }
  isAuthenticated(): boolean {
    if (localStorage.getItem('token')) return true;
    return false;
  }
}
