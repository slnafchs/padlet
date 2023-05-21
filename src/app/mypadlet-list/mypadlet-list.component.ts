import {Component, OnInit} from '@angular/core';
import {Padlet, User} from "../shared/padlet";
import {PadletService} from "../shared/padlet.service";

@Component({
  selector: 'bs-mypadlet-list',
  templateUrl: './mypadlet-list.component.html',
  styles: [
  ]
})
export class MypadletListComponent implements OnInit {
  padlets: Padlet[] = [];

  /*@Output() showDetailsEvent = new EventEmitter<Padlet>();*/
  constructor(
    private bs: PadletService) {}

  ngOnInit() {
    let user_id = <string>sessionStorage.getItem('userId');
    if(user_id) {
      this.bs.getMyPadlets(+user_id).subscribe(res=>this.padlets = res);

    }
  }
}
