import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CustomInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //return next.handle(request);
    request = request.clone({
      withCredentials: false
    });
    request = request.clone({
      setHeaders: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    });
    return next.handle(request).pipe(catchError((error, caught) => {
      if (error.status == 401) {
        console.log('401 status')
        localStorage.clear();
      //  localStorage.setItem("url", location.href);
        location.href = '/';
        //return;
      } else if (error.status == 400) {
        console.log(error.error);
      } else {
        console.log('status true');
        console.log(error);
      }
      throw error;
    }) as any);
  }
}
