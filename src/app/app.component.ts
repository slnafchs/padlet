import {Component, OnInit} from '@angular/core';
import {Padlet, User} from "./shared/padlet";
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';
import {AuthenticationService} from "./shared/authentication.service";
import {PadletService} from "./shared/padlet.service";
import { Invite } from './shared/invite';

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit{
  //title = 'padletAngularApp';
  //listOn = true;
  //detailsOn = false;
  padlet: Padlet | undefined;
  userName : string = "";
  pendingInvites : Invite[] = [];

  constructor(private http: HttpClient,
              private bs : PadletService,
              private authService: AuthenticationService){
    //http.get<Padlet>('https://padlet.s2010456006.student.kwmhgb.at/public').subscribe(val => this.padlet = val);
  }

  ngOnInit(): void {
    if(this.isLoggedIn()) {
      let user_id = +<string>sessionStorage.getItem('userId');
      this.bs.getInvitesByUserId(user_id).subscribe((res: Invite[]) =>{
        this.pendingInvites = res;
      })
    }
  }


  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }



}
