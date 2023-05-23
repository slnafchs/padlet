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
  constructor(private http: HttpClient) {}

  getAllPublicPadlets(): Observable<Array<Padlet>>{
    return this.http.get<Array<Padlet>>(`${this.api}/public`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSinglePadlet(id:number) : Observable<Padlet>{
    return this.http.get<Padlet>(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getMyPadlets(user_id: number) : Observable<Array<Padlet>>{
    return this.http.get<Array<Padlet>>(`${this.api}/mypadlets/${user_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getAllEntries() : Observable<Array<Entrie>>{
    return this.http.get<Array<Entrie>>(`${this.api}/entries`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingleEntrie(entrie_id: number) : Observable<Entrie>{
    return this.http.get<Entrie>(`${this.api}/entries/${entrie_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getUser() : Observable<User[]>{
    return this.http.get<User>(`${this.api}/padlets`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getUserById(id: number) : Observable<User>{
    return this.http.get<User>(`${this.api}/users/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getUserByEmail(email: string) : Observable<User>{
    return this.http.get<User>(`${this.api}/users/mail/${email}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  public getCurrentUserId() : string {
    return <string>sessionStorage.getItem("userId");
  }

  getRatingsForEntrie(id: number) : Observable<Array<Rating>> {
    return this.http.get<Array<Rating>>(`${this.api}/entries/${id}/ratings`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getCommentsForEntrie(id: number) : Observable<Array<Comment>> {
    return this.http.get<Array<Comment>>(`${this.api}/entries/${id}/comments`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createPadlet (padlet: Padlet): Observable<any> {
    return this.http.post(`${this.api}/padlets`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updatePadlet (padlet: Padlet): Observable<any> {
    return this.http.put(`${this.api}/padlets/${padlet.id}`, padlet)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deletePadlet (id: string): Observable<any> {
    return this.http.delete(`${this.api}/padlets/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));

  }

  createEntrie (entrie: Entrie, padlet_id: string): Observable<any> {
    return this.http.post(`${this.api}/padlets/${padlet_id}/entries`, entrie)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateEntrie (entrie: Entrie): Observable<any> {
    return this.http.put(`${this.api}/entries/${entrie.id}`, entrie)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteEntrie (id: string): Observable<any> {
    return this.http.delete(`${this.api}/entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));

  }

  createComment (comment: Comment, entrie_id: string): Observable<any> {
    return this.http.post(`${this.api}/entries/${entrie_id}/comments`, comment)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createRating (rating: Rating, entrie_id: string): Observable<any> {
    return this.http.post(`${this.api}/entries/${entrie_id}/ratings`, rating)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllUserrights(): Observable<Array<any>>{
    return this.http.get<Array<any>>(`${this.api}/userrights`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getUserrightsForPadlet(id: string) : Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.api}/userrights/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getUserrightsForUser(id: string) : Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.api}/userrightsuser/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingleUserright(padlet_id: string, user_id: string): Observable<any>{
    return this.http.get<any>(`${this.api}/userrights/${padlet_id}/${user_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createUserright (userright: Userright): Observable<any> {
    return this.http.post(`${this.api}/userrights`, userright)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateUserright (userright: Userright): Observable<any> {
    return this.http.put(`${this.api}/userrights/${userright.padlet_id}/${userright.user_id}`, userright)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteUserright (padlet_id : string, user_id : string): Observable<any> {
    return this.http.delete(`${this.api}/userrights/${padlet_id}/${user_id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));

  }

  createInvite (invite: Invite): Observable<any> {
    return this.http.post(`${this.api}/invites`, invite)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteInvite (id: string): Observable<any> {
    return this.http.delete(`${this.api}/invites/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getInvitesByUserId(id: number) : Observable<Array<Invite>>{
    return this.http.get<Array<any>>(`${this.api}/invites/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getInviteIfExists(padlet_id: number, user_id: number) : Observable<Invite>{
    return this.http.get<Invite>(`${this.api}/invites/${padlet_id.toString()}/${user_id.toString()}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
