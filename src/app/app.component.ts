

import {Component, OnInit} from '@angular/core';
import {Padlet, User} from "./shared/padlet";
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';
import {AuthenticationService} from "./shared/authentication.service";
import {PadletService} from "./shared/padlet.service";
import { Invite } from './shared/invite';

@Component({
  selector: 'bs-root', //index.html
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit{
  padlet: Padlet | undefined;
  userName : string = "";
  pendingInvites : Invite[] = []; //leere Array

  constructor(private http: HttpClient,
              private bs : PadletService,
              private authService: AuthenticationService){
  }

  //initialisieren
  ngOnInit(): void {
    //wenn eingeloggt ist
    if(this.isLoggedIn()) {
      //die user_id wird im Session Storage gesucht
      let user_id = +<string>sessionStorage.getItem('userId');
      //getInvitesByUserID von padlet service liefert Ergebnis (Einladungen)
      this.bs.getInvitesByUserId(user_id).subscribe((res: Invite[]) =>{
        this.pendingInvites = res; //Ergebnis wird in Array gespeichert
      })
    }
  }

  //wenn eingeloggt, schaut ob token noch gültig ist
  //authentication service
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  //wenn ausgeloggt, token wird entfernt
  //authentication service
  logout() {
    this.authService.logout();
  }

}
