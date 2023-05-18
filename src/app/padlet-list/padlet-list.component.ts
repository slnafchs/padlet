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

  entries: Entrie[] = [];

  /*@Output() showDetailsEvent = new EventEmitter<Padlet>();*/
  constructor(
    private bs: PadletService) {}

  ngOnInit() {
    this.bs.getAllPadlets().subscribe(res=>this.padlets = res);
    this.bs.getUser().subscribe(res=>this.user = res);
    this.bs.getAllEntries().subscribe(res=>this.entries = res);
  }

  /*
  showDetails(padlet:Padlet) {
    this.showDetailsEvent.emit(padlet)
  }*/

}
