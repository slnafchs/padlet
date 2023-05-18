import {Component, OnInit, Input} from '@angular/core';
import {Padlet, User} from "../shared/padlet";

@Component({
  selector: 'a.bs-padlet-list-item',
  templateUrl: './padlet-list-item.component.html',
  styles: [
  ]
})
export class PadletListItemComponent implements OnInit {
  @Input() padlet: Padlet | undefined
  @Input() user: User | undefined

  constructor() {
  }
  ngOnInit() {
  }
}
