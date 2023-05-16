import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {Padlet, User} from '../shared/padlet';
import {Entrie} from "../shared/entrie";
import {PadletService} from "../shared/padlet.service";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: []
})

export class PadletDetailsComponent implements OnInit {

  @Input() padlet: Padlet | undefined
  @Output() showListEvent = new EventEmitter<any>();

  showPadletList() {
    this.showListEvent.emit();
  }

  constructor(private p: PadletService) {
  }

  entries: Entrie[] = [];

  ngOnInit() {
    this.entries = this.p.getAllEntries();
  }
}

