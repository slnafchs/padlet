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

  padlets: Padlet[] = []; // Liste von Padlets
  //user: User[] = [];

  /*@Output() showDetailsEvent = new EventEmitter<Padlet>();*/
  constructor(
    private bs: PadletService) {} //PadletService wird in die PadletListComponent injiziert


  ngOnInit() {
    // Holt alle padlets von Backend, die Public sind -> @PadletService
    // subscribe -> schaut auf Observable, wenn Padlets da sind, dann speichert man res in lokale Liste this.padlets
    // Liste this.padlets beinhaltet jetzt die Padlets (Daten) vom Backend
    this.bs.getAllPublicPadlets().subscribe((res : Padlet[]) =>this.padlets = res);
    //this.bs.getUser().subscribe(res=>this.user = res);
  }

  /*
  showDetails(padlet:Padlet) {
    this.showDetailsEvent.emit(padlet)
  }*/

}
