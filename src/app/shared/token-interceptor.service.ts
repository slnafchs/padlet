import {HttpHandler, HttpEvent, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

// HTTP-Interceptor
// Token entsprechend im HTTP Header mitgeben, damit der Server diesen überprüfen kann
// zum Absichern von Methoden
export class TokenInterceptorService implements HttpInterceptor {

  // erhält als Parameter HTTP-Anfrage und einen HTTP-Handler
  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    request = request.clone({ //klont die Anfrage
      setHeaders: {
        //fügt den Authorisierungsheader mit einem Bearer-Token hinzu, das aus dem sessionStorage abgerufen wird
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    return next.handle(request); //gibt modifizierten Request an den nächsten Handler weiter
  }
}
