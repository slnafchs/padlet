import { Injectable } from '@angular/core';
import {Padlet, User} from "./padlet";
import {Entrie} from "./entrie";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PadletService {
  private api = 'http://padlet.s2010456006.student.kwmhgb.at/api';
  constructor(private http: HttpClient) {}

  getAllPadlets(): Observable<Array<Padlet>>{
    return this.http.get<Array<Padlet>>(`${this.api}/padlets`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSinglePadlet(id:number) : Observable<Padlet>{
    return this.http.get<Padlet>(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getAllEntries() : Observable<Array<Entrie>>{
    return this.http.get<Array<Entrie>>(`${this.api}/entries`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingleEntrie(id:number) : Observable<Entrie>{
    return this.http.get<Entrie>(`${this.api}/padlets/${id}/entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getUser() : Observable<User[]>{
    return this.http.get<User>(`${this.api}/padlets`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
