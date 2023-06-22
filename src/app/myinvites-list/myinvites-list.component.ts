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

  pendingInvites : Invite[] = []; //Array mit Einladungen

  constructor( private bs : PadletService,
    private authService: AuthenticationService
  ) {}

  //initialisieren von Einladungsliste
  ngOnInit(): void {
    if(this.isLoggedIn()) { //wenn User eingeloggt ist
      //userId wird von session storage geholt
      let user_id = +<string>sessionStorage.getItem('userId');
      //getInvitesByUserId() von service holt alle invites für eingeloggten User
      this.bs.getInvitesByUserId(user_id).subscribe((res: any[]) =>{
        for(let obj of res){
          //für alle Objekte des Ergebnisses -> Objekt wird auf invite gemappt und an Array angefügt
          this.pendingInvites.push(Invite.mapInvite(obj));
        }
      })
    }
  }

  //schaut ob User eingeloggt ist (ob token existiert bzw. gültig ist)
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
