import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {



  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          window.alert("You are not authorized to perform this action!");
        }
      }
    }));
  }
}
