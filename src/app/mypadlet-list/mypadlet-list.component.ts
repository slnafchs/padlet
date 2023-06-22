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
  padlets: Padlet[] = []; // leeres padlet array

  /*@Output() showDetailsEvent = new EventEmitter<Padlet>();*/
  constructor(
    private bs: PadletService) {} // padlet service injizieren

  ngOnInit() {
    // user id von eingeloggtem user aus sessionStorage holen
    let user_id = <string>sessionStorage.getItem('userId');
    // wenn user id gültig -> alle padlets vom user anzeigen
    if(user_id) {
      // mit service werden alle padlets von der user id geholt
      this.bs.getMyPadlets(+user_id).subscribe((res : Padlet[]) =>this.padlets = res);
      // ergebnis wird in lokaler padlet liste (array) gespeichert

    }
  }
}
