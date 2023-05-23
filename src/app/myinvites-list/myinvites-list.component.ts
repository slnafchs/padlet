import { Component, OnInit } from '@angular/core';
import { Invite } from '../shared/invite';
import { PadletService } from '../shared/padlet.service';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'bs-myinvites-list',
  templateUrl: './myinvites-list.component.html',
  styles: [
  ]
})
export class MyinvitesListComponent implements OnInit{

  pendingInvites : Invite[] = [];

  constructor( private bs : PadletService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if(this.isLoggedIn()) {
      let user_id = +<string>sessionStorage.getItem('userId');
      this.bs.getInvitesByUserId(user_id).subscribe((res: any[]) =>{
        for(let obj of res){
          this.pendingInvites.push(Invite.mapInvite(obj));
        }
      })
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
