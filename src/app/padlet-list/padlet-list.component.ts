import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Padlet, User} from "../shared/padlet";
import {Entrie} from "../shared/entrie";
import {PadletService} from "../shared/padlet.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: []
})
export class PadletListComponent implements OnInit{

  padlets: Padlet[] = [];
  user: User[] = [];

  /*@Output() showDetailsEvent = new EventEmitter<Padlet>();*/
  constructor(
    private bs: PadletService) {}

  ngOnInit() {
    this.bs.getAllPublicPadlets().subscribe(res=>this.padlets = res);
    this.bs.getUser().subscribe(res=>this.user = res);
  }

  /*
  showDetails(padlet:Padlet) {
    this.showDetailsEvent.emit(padlet)
  }*/

}
