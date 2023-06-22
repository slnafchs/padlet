import { Component } from '@angular/core';
import {Padlet} from "../shared/padlet";
import {PadletService} from "../shared/padlet.service";
import { Userright } from '../shared/userright';

@Component({
  selector: 'bs-privatepadlet-list',
  templateUrl: './privatepadlet-list.component.html',
  styles: [
  ]
})
export class PrivatepadletListComponent {
  padlets: Padlet[] = []; // leeres padlet für alle padlets von user
  privPadlets : Padlet[] = []; // leere liste für private padlets

  /*@Output() showDetailsEvent = new EventEmitter<Padlet>();*/
  constructor(
    private bs: PadletService) {}

   ngOnInit() {
    // user id von eingeloggtem user holen
    let user_id = <string>sessionStorage.getItem('userId');
    // checken ob id gültig
    if(user_id) {
      // alle padlets von user holen mit service
      this.bs.getMyPadlets(+user_id).subscribe(res => {
        // ergebnis in lokaler padlet liste speichern
        this.padlets = res;
        // alle padlets, die privat sind herausfiltern
        this.sortPadlets();
      });
      // alle padlets mit service holen, welche von anderm user sind, aber derzeitiger user rechte hat
      this.getInvitedPadlets(user_id);
    }
  }

  // public padlets aussortieren
  sortPadlets() : void {
    // alle eigenen Padlets durchlaufen
    for(let p of this.padlets) {
      // wenn padlet nicht public (privat) -> in privater liste speichern
      if(!p.is_public) {
        this.privPadlets.push(p); // padlet an liste anfügen
      }
    }
  }

  // padlets von anderen usern durchsuchen (wo user rechte hat)
  getInvitedPadlets(user_id: string) : void {
    // userrights für derzeitigen user holen mit service
    this.bs.getUserrightsForUser(user_id).subscribe((res: any[]) => {
      // ergebnis ist "any" wegen Delete / delete problem
      for(let obj of res) {
        // jedes ergebnis auf userright mappen
        let userright = Userright.mapUserright(obj);
        // padlet von anderem user holen
        // userright.padlet_id verweist auf padlet von dem anderen user (oder eigenem)
        // mit service padlet mit bestimmter padlet id aus userright holen
        this.bs.getSinglePadlet(userright.padlet_id).subscribe((res: Padlet) => {
          // schauen, ob padlet von eingeloggtem user ist
          if(res.user_id != +user_id && res.is_public == false) {
            // wenn padlet nicht von derzeitigem user und public = false -> in privater Liste speichern
            this.privPadlets.push(res);
          }
        });
      }
    });
  }
}
