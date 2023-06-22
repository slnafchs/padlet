
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse
} from "@angular/common/http";
import {Observable, tap} from "rxjs";
@Injectable({
  providedIn: 'root'
})

// HTTP Interceptor
// JWT-Interceptor speziell für die Verwendung von JSON Web Tokens zur Authentifizierung und Autorisierung ausgelegt
export class JwtInterceptorService implements HttpInterceptor {
  //erhält eine HTTP-Anfrage (request) und einen HTTP-Handler (next) als Parameter
  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // führt die übergebene Anfrage mit dem nächsten Handler aus
    // es wird überprüft, ob das Ereignis eine HTTP-Antwort ist
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      //falls ja, passiert nichts
      if (event instanceof HttpResponse) {
      }
      //Falls jedoch ein Fehler auftritt, wird überprüft, ob der Fehlercode 401 (Unauthorized) is
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        // wenn Fehlercode = 401, dann Benutzer darauf hinzuweisen, dass die Authentifizierung fehlgeschlagen ist
        if (err.status === 401) {
          window.alert("Ups! Überprüfen Sie bitte Ihr E-Mail und Passwort!");
        }
      }
    }));
  }
}
