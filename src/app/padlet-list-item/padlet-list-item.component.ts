import {Component, OnInit, Input} from '@angular/core';
import {Padlet, User} from "../shared/padlet";
import {formatDate} from "@angular/common";
import {PadletService} from "../shared/padlet.service";

@Component({
  selector: 'a.bs-padlet-list-item',
  templateUrl: './padlet-list-item.component.html',
  styles: [
  ]
})
export class PadletListItemComponent implements OnInit {
  @Input() padlet: Padlet | undefined //[padlet] in padlet-list-component.html
  //[padlet] in eckigen Klammern, da es ein Input ist und es in der padlet-list-component.html übergeben
  //wird, nicht in der item!

  dateString : string = ""; //{{dateString}} in padlet-list-item.component.html

  constructor() {}

  ngOnInit() {
    if(this.padlet) {
      //Formatierung des Erstellungsdatum von Padlet
      this.dateString = formatDate(this.padlet!.created_at, 'dd/MM/yyyy', 'en-US');
    }
  }
}
