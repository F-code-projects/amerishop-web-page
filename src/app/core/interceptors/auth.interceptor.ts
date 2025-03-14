import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      setHeaders: {
        apikey: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwaGR1cm9ueW51aGRpc2xkZHdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MTIyMTgsImV4cCI6MjA1NzQ4ODIxOH0.uoAq9lwi7ZRO7x_FjGYsnOKnsViRpxAd5QNqDpY0VP0`, 
      },
    });

    return next.handle(modifiedReq);
  }
}
