import { Component } from '@angular/core';
import {Padlet} from "../shared/padlet";
import {PadletService} from "../shared/padlet.service";

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
    }
  }

  sortPadlets() : void {
    for(let p of this.padlets) {
      if(!p.is_public) {
        this.privPadlets.push(p);
      }
    }
  }
}
