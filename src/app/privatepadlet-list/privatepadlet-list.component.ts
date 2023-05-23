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
  padlets: Padlet[] = [];
  privPadlets : Padlet[] = [];

  /*@Output() showDetailsEvent = new EventEmitter<Padlet>();*/
  constructor(
    private bs: PadletService) {}

   ngOnInit() {
    let user_id = <string>sessionStorage.getItem('userId');
    if(user_id) {
      this.bs.getMyPadlets(+user_id).subscribe(res => {
        this.padlets = res;
        this.sortPadlets();
      });
      this.getInvitedPadlets(user_id);
    }
  }

  sortPadlets() : void {
    for(let p of this.padlets) {
      if(!p.is_public) {
        this.privPadlets.push(p);
      }
    }
  }

  getInvitedPadlets(user_id: string) : void {
    this.bs.getUserrightsForUser(user_id).subscribe((res: any[]) => {
      for(let obj of res) {
        let userright = Userright.mapUserright(obj);
        this.bs.getSinglePadlet(userright.padlet_id).subscribe((res: Padlet) => {
          if(res.user_id != +user_id && res.is_public == false) {
            this.privPadlets.push(res);
          }
        });
      }
    });
  }
}
