
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import jwt_decode from "jwt-decode";
import {User} from "./user";

interface Token {
  exp: number;
  user: {
    id: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  // URL zu Backend
  private api = 'http://padlet.s2010456006.student.kwmhgb.at/api/auth';

  constructor(private http: HttpClient) {
  }


  //Login
  login(email: string, password: string) {
    // sendet post request mit user mail und passwort an backend
    // liefert ergebnis zurück
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }


  //Session Storage
  public setSessionStorage(token: string) {
    const decodedToken = jwt_decode(token) as Token; //jwt decodieren
    //Token und User ID wird im Session Storage gespeichert
    sessionStorage.setItem("token", token); //den normalen token speichern
    sessionStorage.setItem("userId", decodedToken.user.id); //aus dem decodierden jwt user_id holen und speichern
  }

  //ausloggen
  public logout() {
    this.http.post(`${this.api}/logout`, {});
    //session storage wird gelöscht
    sessionStorage.removeItem("token"); //token wird entfernt
    sessionStorage.removeItem("userId"); //user id wird entfernt
  }

  //wenn eingeloggt
  public isLoggedIn(): boolean {
    //wenn der Session Storage den token bekommt
    if (sessionStorage.getItem("token")) {
      //speichern wir den token in let token
      let token: string = <string>sessionStorage.getItem("token");
      //der token wird decodiert und wieder gespeichert
      const decodedToken = jwt_decode(token) as Token;
      //Ablaufdatum des Tokens
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp); //Ablaufdatum
      //ist das Ablaufdatum früher als das jetzige Datum
      if (expirationDate < new Date()) {
        return false; //dann ist token abgelaufen
      }
      return true;
    } else {
      return false;
    }
  }

}
