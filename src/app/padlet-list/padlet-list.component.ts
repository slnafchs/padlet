import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Padlet, User} from "../shared/padlet";
import {PadletService} from "../shared/padlet.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: []
})
export class PadletListComponent implements OnInit{

  padlets: Padlet[] = [];

  @Output() showDetailsEvent = new EventEmitter<Padlet>();
  constructor(private bs: PadletService) {}

  ngOnInit() {
    this.padlets = this.bs.getAllPadlets();
  }

  /*showDetails(padlet:Padlet) {
    this.showDetailsEvent.emit(padlet)
  }*/
}
