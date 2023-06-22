import { Component, Input } from '@angular/core';
import {Padlet, User, Userright} from '../shared/userright';
import { UserrightFactory } from '../shared/userright-factory';
import { PadletService } from '../shared/padlet.service';
import { UserFactory } from '../shared/user-factory';

@Component({
  selector: 'bs-userright-item',
  templateUrl: './userright-item.component.html',
  styles: [
  ]
})
export class UserrightItemComponent {
  @Input() userright : Userright = UserrightFactory.empty();
  user : User = UserFactory.empty();
  canDelete : boolean = true;

  constructor( private bs : PadletService) {}

  //initalisierung von Userright
  ngOnInit(): void {
    //getUserById von service holt User von Userright
    this.bs.getUserById(this.userright.user_id).subscribe((res: User) => {
      //ergebnis wird in lokalen user gespeichert
      this.user = res;
      //getSinglePadlet von service holt Padlet von Userright
      this.bs.getSinglePadlet(this.userright.padlet_id).subscribe((res: Padlet) => {
        //wenn User von Userright und User von Padlet (Owner) gleich ist
        if(this.userright.user_id == res.user_id) {
          //dann kann man Userright nicht löschen
          this.canDelete = false;
        }
      });
    });
  }

  //löschen von Userright
  delete() : void {
    //deleteUserright von service löscht Userright
    this.bs.deleteUserright(this.userright.padlet_id.toString(), this.userright.user_id.toString()).subscribe(() => {
      window.location.reload(); //Seite neu laden
    });
  }
}
