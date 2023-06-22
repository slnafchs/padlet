import { Component, Input, OnInit } from '@angular/core';
import { Invite } from '../shared/invite';
import { InviteFactory } from '../shared/invite-factory';
import { PadletService } from '../shared/padlet.service';
import { UserFactory } from '../shared/user-factory';
import { PadletFactory } from '../shared/padlet-factory';
import { User } from '../shared/user';
import { Padlet } from '../shared/entrie';
import { Userright } from '../shared/userright';

@Component({
  selector: 'bs-invite-item',
  templateUrl: './invite-item.component.html',
  styles: [
  ]
})
export class InviteItemComponent implements OnInit{
  @Input() invite : Invite = InviteFactory.empty(); //invite (leer initialisiert), wird übergeben von myinvite-list
  padlet : Padlet = PadletFactory.empty();

  constructor( private bs : PadletService) {}

  //initialisieren von Einladung
  ngOnInit(): void {
    //getSinglePadlet() von service holt Padlet von invite mit padlet_id
    this.bs.getSinglePadlet(this.invite.padlet_id).subscribe((res: Padlet) => {
      //speichert Ergebnis in lokales padlet
      this.padlet = res;
    })
  }

  //Einladung akzeptieren
  accept() : void {
    //neues Userright wird erstellt und in usseright gespeichert mit Daten von invite und padlet
    let userright = new Userright(this.invite.user_id, this.padlet.id, this.invite.read, this.invite.edit, this.invite.Delete);
    //createUserright von service erstellt neues Userright und löscht die Einladung
    this.bs.createUserright(userright).subscribe(() => {
      this.bs.deleteInvite(this.invite.id.toString()).subscribe(() => {
        //Einladung wird wieder leer
        this.invite = InviteFactory.empty();
        window.location.reload() //Seite wird neu geladen
      });
    });
  }

  //Einladung ablehnen
  decline() : void {
    //deleteInvite() von service löscht Einladung ohne neues Userright zu erstellen
    this.bs.deleteInvite(this.invite.id.toString()).subscribe(() => {
      this.invite = InviteFactory.empty() //Einladung wird wieder leer
      window.location.reload() //Seite neu laden
    });
  }
}
