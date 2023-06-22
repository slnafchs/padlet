import { Injectable } from '@angular/core';
import {Padlet, User} from "./padlet";
import {Entrie} from "./entrie";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs";
import {Rating} from "./rating";
import {Comment} from "./comment";
import {Userright} from "./userright";
import {Invite} from "./invite";

@Injectable({
  providedIn: 'root'
})

export class PadletService {
  private api = 'http://padlet.s2010456006.student.kwmhgb.at/api';
  constructor(private http: HttpClient) {} //Der HttpClient wird über den Konstruktor injiziert


  //Holt alle public Padlets vom backend
  //Observable -> verfolgt die Ergebnisse einer HTTP Anfrage (get)
  //danach subscribe (siehe @padlet-list.component.ts)
  getAllPublicPadlets(): Observable<Array<Padlet>>{
    return this.http.get<Array<Padlet>>(`${this.api}/public`)
      // pipe wird verwendet, um zwei Operatoren auf das Observable anzuwenden (retry und catchError)
      // bevor Observable abonniert wird
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //holt Padlet mit einer bestimmten ID
  getSinglePadlet(id:number) : Observable<Padlet>{
    return this.http.get<Padlet>(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //holt "meine" Padlets
  getMyPadlets(user_id: number) : Observable<Array<Padlet>>{
    return this.http.get<Array<Padlet>>(`${this.api}/mypadlets/${user_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //holt alle Entries
  getAllEntries() : Observable<Array<Entrie>>{
    return this.http.get<Array<Entrie>>(`${this.api}/entries`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //holt Entrie mit bestimmter ID
  getSingleEntrie(entrie_id: number) : Observable<Entrie>{
    return this.http.get<Entrie>(`${this.api}/entries/${entrie_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //holt User mit bestimmter ID
  getUserById(id: number) : Observable<User>{
    return this.http.get<User>(`${this.api}/users/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //holt User mit Email
  getUserByEmail(email: string) : Observable<User>{
    return this.http.get<User>(`${this.api}/users/mail/${email}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //holt eingeloggten User
  public getCurrentUserId() : string {
    return <string>sessionStorage.getItem("userId");
  }

  //holt Ratings für bestimmten Entrie
  getRatingsForEntrie(id: number) : Observable<Array<Rating>> {
    return this.http.get<Array<Rating>>(`${this.api}/entries/${id}/ratings`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //holt Kommentare für bestimmten Entrie
  getCommentsForEntrie(id: number) : Observable<Array<Comment>> {
    return this.http.get<Array<Comment>>(`${this.api}/entries/${id}/comments`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //erstellt Padlet
  createPadlet (padlet: Padlet): Observable<any> {
    return this.http.post(`${this.api}/padlets`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //aktualisiert Padlet
  updatePadlet (padlet: Padlet): Observable<any> {
    return this.http.put(`${this.api}/padlets/${padlet.id}`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Löscht Padlet mit padlet_id
  //Observable -> verfolgt die Ergebnisse einer HTTP Anfrage (delete)
  //schickt eine HTTP delete Anfrage an Backend (api.php)
  //liefert Observable von http delete zurück
  deletePadlet (id: string): Observable<any> {
    return this.http.delete(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));

  }

  //erstellt Entrie
  createEntrie (entrie: Entrie, padlet_id: string): Observable<any> {
    return this.http.post(`${this.api}/padlets/${padlet_id}/entries`, entrie)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //aktualisiert Entrie
  updateEntrie (entrie: Entrie): Observable<any> {
    return this.http.put(`${this.api}/entries/${entrie.id}`, entrie)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //löscht Entrie
  deleteEntrie (id: string): Observable<any> {
    return this.http.delete(`${this.api}/entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));

  }

  //erstellt Kommentar
  createComment (comment: Comment, entrie_id: string): Observable<any> {
    return this.http.post(`${this.api}/entries/${entrie_id}/comments`, comment)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //erstellt Bewertung
  createRating (rating: Rating, entrie_id: string): Observable<any> {
    return this.http.post(`${this.api}/entries/${entrie_id}/ratings`, rating)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //holt Userricht für bestimmtes Padlet
  getUserrightsForPadlet(id: string) : Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.api}/userrights/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //holt Userright von bestimmten User
  getUserrightsForUser(id: string) : Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.api}/userrightsuser/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //holt Userright
  getSingleUserright(padlet_id: string, user_id: string): Observable<any>{
    return this.http.get<any>(`${this.api}/userrights/${padlet_id}/${user_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //erstellt Userright
  createUserright (userright: Userright): Observable<any> {
    return this.http.post(`${this.api}/userrights`, userright)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //löscht Userright
  deleteUserright (padlet_id : string, user_id : string): Observable<any> {
    return this.http.delete(`${this.api}/userrights/${padlet_id}/${user_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));

  }

  //erstellt Einladung
  createInvite (invite: Invite): Observable<any> {
    return this.http.post(`${this.api}/invites`, invite)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //löscht Einladung
  deleteInvite (id: string): Observable<any> {
    return this.http.delete(`${this.api}/invites/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //holt Einladungen von bestimmter User ID
  getInvitesByUserId(id: number) : Observable<Array<Invite>>{
    return this.http.get<Array<any>>(`${this.api}/invites/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //holt Einladung, falls sie exisiert
  getInviteIfExists(padlet_id: number, user_id: number) : Observable<Invite>{
    return this.http.get<Invite>(`${this.api}/invites/${padlet_id.toString()}/${user_id.toString()}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  //wirft Fehler
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
