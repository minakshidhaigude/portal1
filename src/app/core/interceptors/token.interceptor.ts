import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { NEVER, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared-component/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const skipRoute: string[] = ['login', 'register', 'forgotpw'];
    if (skipRoute.find((s) => request.url.includes(s))) {
      return next.handle(request);
    }
    if (localStorage.getItem('token')) {
      const data = JSON.parse(localStorage.getItem('userDetails') || '{}');
      if (new Date().getTime() / 1000 < data.exp) {
        request = request.clone({
          headers: request.headers.set(
            'authorization',
            localStorage.getItem('token')
          ),
        });
        return next.handle(request);
      } else {
        localStorage.clear();
        this.router.navigate(['/user/login']);
        return NEVER;
      }
    } else {
      this.router.navigate(['/user/login']);
    }
    return NEVER;
  }
}
