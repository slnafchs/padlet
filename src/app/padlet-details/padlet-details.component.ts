import {Component, OnInit} from '@angular/core';
import {Padlet, User} from '../shared/padlet';
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import {Rating} from "../shared/rating";
import {Comment} from "../shared/comment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Invite} from "../shared/invite";
import {InviteFactory} from "../shared/invite-factory";
import { Userright } from '../shared/userright';
import { UserrightFactory } from '../shared/userright-factory';

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})

export class PadletDetailsComponent implements OnInit {

  padlet: Padlet = PadletFactory.empty();
  inviteForm: FormGroup; //Gruppierung der Formularelemente

  invite : Invite = InviteFactory.empty();
  invite_usermail : string = "";
  isMenuOpen : boolean = false; //toggle ist automatisch zu
  isOwner : boolean = false;
  userrights : Userright = UserrightFactory.empty();

  constructor(
    private bs: PadletService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.inviteForm = this.fb.group({}); //anfangs leer
  }

  //initialisieren von Padlet
  ngOnInit() {
    const params = this.route.snapshot.params; //route parameter aus app-routing.module.ts
    //mit getSinglePadlet aus Service wird das Padlet mit der ID geholt
    this.bs.getSinglePadlet(params['id'])
      //Ergebnis des Observables ist p:Padlet
      .subscribe((p: Padlet) => {
        //p:Padlet wird lokales Padlet, was anfangs leer war
        this.padlet = p;
        this.getRatings(); //Ratings werden geholt
        this.getComments(); //Comments werden geholt
        //im Session Storage gespeicherte user_id
        let user_id : string = <string>sessionStorage.getItem('userId')
        //wenn user_id von padlet der ID vom eingeloggten User gleicht, dann ist isOwner true
        if(this.padlet.user_id.toString() == user_id) {
          this.isOwner = true;
        }
        //Userrechte vom eingeloggten User holen
        //mit getSingleUserright aus dem service holt man die Userrights für das Padlet von den eingeloggten User
        //Ergebnis vom Observable ist vom Typ "any", weil im userright.ts (Model) Delete groß und im Datenbankmodell
        //delete klein definiert ist. In Angular ist delete ein Schlüsselwort, daher kann Userright nicht direkt "gemappt" werden
        this.bs.getSingleUserright(this.padlet.id.toString(), user_id).subscribe((res: any) => {
          let userright = Userright.mapUserright(res); //Ergebnis auf Userright mappen
          if(userright.user_id == undefined) { //gibt es die id?
            //lokale Userrights wird erstellt, wenns Userright noch nicht gibt
            this.userrights = new Userright(+user_id, this.padlet.id, true, false, false)
          }
          else {
            this.userrights = userright; //lokales Userright ist Userright aus Datenbank

          }
        })
      });
    this.initInvite();
  }

  //initialisieren der FormGroup
  initInvite() : void {
    this.inviteForm = this.fb.group({
      id: this.invite.id,
      user: [this.invite_usermail, Validators.required],
      read: this.invite.read,
      edit: this.invite.edit,
      Delete: this.invite.Delete
    });
  }

  //Ratings holen
  getRatings() : void {
    for(let entrie of this.padlet?.entries) { //für jeden Entrie in this.padlet
      //ruft von service.ts getRatingsForEntrie() auf und Ergebnis ist ein Array mit den Ratings
      this.bs.getRatingsForEntrie(entrie.id).subscribe((res: Rating[]) => {
        entrie.ratings = res;
      })
    }
  }

  //Comments holen
  getComments() : void {
    for (let entrie of this.padlet?.entries) { //für jeden Entrie in this.padlet
      //ruft von service.ts getCommentsForEntrie() auf und Ergebnis ist ein Array mit den Comments
      this.bs.getCommentsForEntrie(entrie.id).subscribe((res: Comment[]) => {
        entrie.comments = res;
      });
    }
  }

  //Toggle Menü, klappt Menü auf und zu
  toggleMenu() : void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  //Padlet löschen
  delete() : void {
    if(confirm("Möchten Sie das Padlet wirklich löschen?")) { //window.confirm, ähnlich zu alert
      //ruft von service.ts deletePadlet() auf und navigiert wieder auf Startseite (public Padlets)
      this.bs.deletePadlet(this.padlet.id.toString()).subscribe(res => {
        this.router.navigateByUrl('/public');
      });
    }
  }

  //User einladen
  inviteUser() : void {
    const modalElement = document.getElementById(`padlet-modal`); //sucht Modal nach id
    if (modalElement) { //wenn modal existiert
      modalElement.classList.add('show'); //in der class wird show hinzugefügt, um das Modal zu sehen
      modalElement.style.display = "block";
    }
  }

  //Modal schließt
  modalClose() : void {
    this.invite_usermail = ""; //User Input löschen
    //alle Modals suchen
    document.querySelectorAll<HTMLElement> ('.modal').forEach(it => {
      it.classList.remove('show'); //aus class löschen
      it.style.display = "none"; //damit sie nicht mehr angezeigt werden
    });
  }

  //Formular für Einladungen abschicken
  async submitInviteForm() {
    if (this.inviteForm.valid) {
      // Usereingabe vom Feld Email holen
      this.invite_usermail = this.inviteForm.get('user')!.value;
      // User mit dieser Email vom Service holen (warten)
      let user = await this.getUserByMail(this.invite_usermail);
      // wenn user existiert, weiter machen
      if(user.id) {
        // checken ob Email die eigene Email ist (vom eingeloggten User)
        if(user.id != this.padlet.user_id) {
          // Invite erstellen mit Daten aus inviteForm
          this.invite = InviteFactory.fromObject(this.inviteForm.value);
          // user id in invite speichern
          this.invite.user_id = user.id;
          // id von diesem padlet
          this.invite.padlet_id = this.padlet.id;

          // checken ob bereits ein Invite für diesen user existiert
          // wenn exisistiert -> löschen
          await this.deleteInviteIfExists(this.invite);

          // neuen invite erstellen im service
          this.bs.createInvite(this.invite).subscribe(res => {
            this.invite = InviteFactory.empty(); // invite daten "clearen"
            this.modalClose(); // modal wieder schließen
            // benutzer mitteilen, dass Einladung erfolgreich versendet wurde
            window.alert("Einladung erfolgreich versendet.");
          });
        }
        // wenn eigene Email -> alarmieren
        else {
          window.alert("Dieses Padlet gehört bereits Ihnen.");
        }
      }
      // wenn user mit Email nicht existiert -> alarmieren
      else {
        window.alert(`Benutzer mit E-Mail ${this.invite_usermail} konnte nicht gefunden werden.`);
      }
    }

  }

  // schaut, ob ein invite bereits vorhanden ist und löscht ihn falls ja
  async deleteInviteIfExists(invite : Invite) : Promise<unknown> {
    return new Promise((resolve, reject) => {
      // sucht mit service nach invite mit der selben padlet_id und user_id
      this.bs.getInviteIfExists(invite.padlet_id, invite.user_id).subscribe({
        next: (res: Invite ) => {
          // wenn invite existiert -> löschen
          if(res.id) {
            // löschen des invites im service
            this.bs.deleteInvite(res.id.toString()).subscribe(res => resolve(null));
          }
          resolve(null)
        },
        // wenn getInviteIfExists fehl schlägt -> error
        error: (error) => {
          if (error.status === 404) {
            reject("Error getting user.");
          }
        },
        complete: () => {
        }
      });
    });
  }

  // holt User mit bestimmter Mail
  async getUserByMail(mail: string): Promise<User> {
    return new Promise((resolve, reject) => {
      // sucht mittels service einen user mit dieser email
      this.bs.getUserByEmail(mail).subscribe({
        next: (res: User) => {
          // user zurückliefern
          resolve(res);
        },
        error: (error) => {
          if (error.status === 404) {
            reject("Error getting user.");
          }
        },
        complete: () => {
        }
      });
    });
  }


}
