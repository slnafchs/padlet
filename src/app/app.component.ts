import {Component, OnInit} from '@angular/core';
import {Padlet, User} from "./shared/padlet";
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';
import {AuthenticationService} from "./shared/authentication.service";
import {PadletService} from "./shared/padlet.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html'
})

export class AppComponent{
  //title = 'padletAngularApp';
  //listOn = true;
  //detailsOn = false;
  padlet: Padlet | undefined;
  userName : string = "";

  constructor(private http: HttpClient,
              private bs : PadletService,
              private authService: AuthenticationService){
    http.get<Padlet>('https://padlet.s2010456006.student.kwmhgb.at/padlets').subscribe(val => this.padlet = val);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }



}
