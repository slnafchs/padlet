import { Component, OnInit } from '@angular/core';
import { PadletService } from '../shared/padlet.service';
import { ActivatedRoute } from '@angular/router';
import { Userright } from '../shared/userright';

@Component({
  selector: 'bs-userrights-list',
  templateUrl: './userrights-list.component.html',
  styles: [
  ]
})
export class UserrightsListComponent implements OnInit{
  userrights : Userright[] = [] //Array mit Userrights

  constructor(
    private bs: PadletService,
    private route: ActivatedRoute,
  ) {
  }

  //initialisieren von Userright-Liste
  ngOnInit(): void {
    //route param wird in const id gespeichert
    const id = this.route.snapshot.params["padlet_id"];
    //getUserrightsForPadlet() von service holt Userrights für bestimmtes Padlet
    this.bs.getUserrightsForPadlet(id.toString()).subscribe((res: any[]) => {
      for(let obj of res) {
        //Objekte von Ergebnis werden gemappt und Userrights werden in Array gespeichert
        this.userrights.push(Userright.mapUserright(obj));
      }
    });
  }

}
