import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {User} from "../shared/user";
import {PadletService} from "../shared/padlet.service";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: []
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];
  @Output() showDetailsEvent = new EventEmitter<Padlet>();

  constructor(private p: PadletService) {
  }


  ngOnInit() {
    this.padlets = this.p.getAllPadlets();
  }
  showDetails(padlet: Padlet) {
    this.showDetailsEvent.emit(padlet);
  }
}
